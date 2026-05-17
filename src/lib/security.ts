// ==========================================
// Security Utilities - Tin12 Pro Cánh Diều
// Input sanitization and basic security helpers
// ==========================================

// ============ INPUT SANITIZATION ============

/**
 * Sanitize HTML to prevent XSS
 * Removes dangerous tags and attributes
 */
export function sanitizeHTML(input: string): string {
  if (!input) return '';

  return input
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers (onerror=, onclick=, onload=, etc.)
    .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove data: URLs (could contain encoded scripts)
    .replace(/data:/gi, '')
    // Remove expression() in CSS
    .replace(/expression\s*\(/gi, '')
    // Remove vbscript: URLs
    .replace(/vbscript:/gi, '');
}

/**
 * Sanitize user input for general use
 * Removes potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, '') // Remove quotes
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Sanitize SQL-like input (basic - not for real SQL)
 */
export function sanitizeSQL(input: string): string {
  if (!input) return '';

  return input
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '')
    .replace(/xp_/gi, '')
    .replace(/exec/gi, '')
    .replace(/execute/gi, '')
    .trim();
}

/**
 * Sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return 'unnamed';

  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .slice(0, 255);
}

// ============ VALIDATION ============

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Reject ftp protocol
    if (parsed.protocol === 'ftp:') return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if input contains HTML tags
 */
export function containsHTML(input: string): boolean {
  return /<[^>]+>/g.test(input);
}

/**
 * Check if input contains code/script
 */
export function containsCode(input: string): boolean {
  const codePatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /expression\s*\(/i,
    /\$\{.*\}/,  // Template literals
    /<\/?[a-z][\s\S]*>/i, // HTML tags
  ];

  return codePatterns.some(p => p.test(input));
}

// ============ RATE LIMITING HELPERS ============

/**
 * Simple in-memory rate limiter for demo
 * In production, use Redis or similar
 */
export interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
}

const rateLimitStore = new Map<string, RateLimitState>();

/**
 * Check if action is rate limited
 */
export function isRateLimited(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const state = rateLimitStore.get(key);

  if (!state || now - state.lastAttempt > windowMs) {
    // Reset if window has passed
    rateLimitStore.set(key, { attempts: 1, lastAttempt: now, blocked: false });
    return false;
  }

  if (state. blocked) {
    return true;
  }

  if (state.attempts >= maxAttempts) {
    // Block for the rest of the window
    rateLimitStore.set(key, { ...state, blocked: true });
    return true;
  }

  // Increment attempts
  rateLimitStore.set(key, {
    attempts: state.attempts + 1,
    lastAttempt: now,
    blocked: false,
  });

  return false;
}

/**
 * Reset rate limit for a key
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

// ============ PERMISSION HELPERS ============

export type Permission = 'read' | 'write' | 'admin';

export interface UserPermissions {
  lessons: Permission;
  quizzes: Permission;
  exams: Permission;
  labs: Permission;
  flashcards: Permission;
  aiTutor: Permission;
}

/**
 * Check if user has permission for an action
 */
export function hasPermission(
  userRole: 'student' | 'teacher' | 'admin',
  action: keyof UserPermissions,
  _resourceOwnerId?: string,
  _userId?: string
): boolean {
  // Admin can do everything
  if (userRole === 'admin') return true;

  // Teachers have elevated permissions
  if (userRole === 'teacher') {
    const teacherPermissions: UserPermissions = {
      lessons: 'read',
      quizzes: 'read',
      exams: 'read',
      labs: 'read',
      flashcards: 'write',
      aiTutor: 'read',
    };
    return teacherPermissions[action] === 'read' || teacherPermissions[action] === 'write';
  }

  // Students have limited permissions
  const studentPermissions: UserPermissions = {
    lessons: 'read',
    quizzes: 'write',
    exams: 'write',
    labs: 'write',
    flashcards: 'write',
    aiTutor: 'read',
  };

  return studentPermissions[action] === 'read' || studentPermissions[action] === 'write';
}

// ============ DATA PRIVACY HELPERS ============

/**
 * Anonymize user data for analytics
 */
export function anonymizeUserData<T extends Record<string, unknown>>(
  data: T,
  fieldsToRemove: string[] = ['email', 'name', 'avatar']
): T {
  const anonymized = { ...data };

  for (const field of fieldsToRemove) {
    if (field in anonymized) {
      delete anonymized[field];
    }
  }

  return anonymized;
}

/**
 * Generate a hash for data integrity check
 */
export function generateDataHash(data: string): string {
  // Simple hash for demo - in production use crypto.subtle
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Verify data integrity
 */
export function verifyDataIntegrity(data: string, expectedHash: string): boolean {
  const actualHash = generateDataHash(data);
  return actualHash === expectedHash;
}

// ============ CSP HELPERS ============

/**
 * Generate Content Security Policy header value
 */
export function generateCSP(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // 'unsafe-inline' for demo; tighten in prod
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  return directives.join('; ');
}

// ============ EXPORT ALL ============

export const security = {
  sanitizeHTML,
  sanitizeInput,
  sanitizeSQL,
  sanitizeFileName,
  isValidEmail,
  isValidURL,
  containsHTML,
  containsCode,
  isRateLimited,
  resetRateLimit,
  hasPermission,
  anonymizeUserData,
  generateDataHash,
  verifyDataIntegrity,
  generateCSP,
};

export default security;