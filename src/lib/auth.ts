// ==========================================
// Auth Utilities - Tin12 Pro Cánh Diều
// Authentication helpers with mock token support
// ==========================================

import { cookies } from 'next/headers';
import { isValidEmail } from './validation';

// ============ TYPES ============

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  track: 'CS' | 'ICT' | 'GENERAL';
  xp: number;
  level: number;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

// ============ TOKEN MANAGEMENT (DEMO) ============

// In production, use proper JWT or session management
// This is a simple mock token system for demo purposes

const DEMO_TOKEN_SECRET = 'tin12-pro-demo-secret-change-in-production';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

/**
 * Create a simple demo token (NOT secure - use JWT in production)
 */
export function createDemoToken(user: AuthUser): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  
  // Simple base64 encoding for demo (use JWT in production)
  const token = Buffer.from(JSON.stringify(payload)).toString('base64');
  return `${token}.${Buffer.from(DEMO_TOKEN_SECRET).toString('base64')}`;
}

/**
 * Verify and decode demo token
 */
export function verifyDemoToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    
    const payload = JSON.parse(Buffer.from(parts[0], 'base64').toString());
    if (payload.exp < Date.now()) return null;
    
    // In production, verify signature here
    return payload;
  } catch {
    return null;
  }
}

/**
 * Extract token from Authorization header or cookie
 */
export async function extractToken(): Promise<string | null> {
  const cookieStore = await cookies();
  
  // Try cookie first
  const cookieToken = cookieStore.get('auth_token')?.value;
  if (cookieToken) return cookieToken;
  
  // In API routes, could also check Authorization header
  return null;
}

/**
 * Get current user from token (for API routes)
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await extractToken();
  if (!token) return null;
  
  const payload = verifyDemoToken(token);
  if (!payload) return null;
  
  // In production, fetch user from database
  // For demo, return mock user based on token
  return {
    id: payload.userId,
    email: payload.email,
    name: payload.email.split('@')[0],
    role: payload.role as AuthUser['role'],
    track: 'GENERAL',
    xp: 0,
    level: 1,
  };
}

// ============ PASSWORD HANDLING ============

// Note: For demo, passwords are stored as plain text hash
// In production, use bcrypt or argon2

/**
 * Simple password hash (demo only - use bcrypt in production)
 */
export function hashPassword(password: string): string {
  // This is a mock hash for demo purposes
  // In production, use: bcrypt.hash(password, 12) or argon2
  const salt = 'tin12-pro-salt';
  let hash = 0;
  const combined = password + salt;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Verify password (demo only)
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ============ AUTH HELPERS ============

/**
 * Validate registration input
 */
export function validateRegistration(
  email: string,
  password: string,
  name: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!email || !isValidEmail(email)) {
    errors.push('Email không hợp lệ');
  }
  
  if (!password || password.length < 6) {
    errors.push('Mật khẩu phải có ít nhất 6 ký tự');
  }
  
  if (!name || name.trim().length < 2) {
    errors.push('Tên phải có ít nhất 2 ký tự');
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Create safe user object (remove sensitive fields)
 */
export function sanitizeUser(user: AuthUser): AuthUser {
  return { ...user };
}

/**
 * Check if user has required role
 */
export function hasRole(user: AuthUser | null, allowedRoles: string[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized - Please login');
  }
  return user;
}

/**
 * Require specific role - throws if not authorized
 */
export async function requireRole(allowedRoles: string[]): Promise<AuthUser> {
  const user = await requireAuth();
  if (!hasRole(user, allowedRoles)) {
    throw new Error('Forbidden - Insufficient permissions');
  }
  return user;
}