// ==========================================
// RBAC (Role-Based Access Control) - Tin12 Pro Cánh Diều
// Permission checking for admin/teacher/student
// ==========================================

import type { AuthUser } from './auth';

// ============ ROLES & PERMISSIONS ============

export type Role = 'STUDENT' | 'TEACHER' | 'ADMIN';

export type Resource = 
  | 'courses' 
  | 'lessons' 
  | 'questions' 
  | 'exams' 
  | 'labs' 
  | 'flashcards' 
  | 'ai_tutor'
  | 'users'
  | 'classes'
  | 'analytics';

export type Action = 'read' | 'create' | 'update' | 'delete' | 'admin';

interface RolePermissions {
  courses: Action[];
  lessons: Action[];
  questions: Action[];
  exams: Action[];
  labs: Action[];
  flashcards: Action[];
  ai_tutor: Action[];
  users: Action[];
  classes: Action[];
  analytics: Action[];
}

// Role hierarchy
const ROLE_HIERARCHY: Record<Role, number> = {
  STUDENT: 1,
  TEACHER: 2,
  ADMIN: 3,
};

// Permission matrix
const PERMISSIONS: Record<Role, RolePermissions> = {
  STUDENT: {
    courses: ['read'],
    lessons: ['read'],
    questions: ['read', 'create'], // Can practice and submit
    exams: ['read', 'create'],    // Can take exams
    labs: ['read', 'create'],     // Can do labs
    flashcards: ['read', 'create', 'update'], // Can review
    ai_tutor: ['read', 'create'], // Can chat
    users: [],                     // No access
    classes: ['read'],            // Can view enrolled classes
    analytics: [],                // No access
  },
  TEACHER: {
    courses: ['read', 'create', 'update'],
    lessons: ['read', 'create', 'update'],
    questions: ['read', 'create', 'update'],
    exams: ['read', 'create', 'update'],
    labs: ['read', 'create', 'update'],
    flashcards: ['read', 'create', 'update'],
    ai_tutor: ['read', 'create'],
    users: ['read'],              // Can view students
    classes: ['read', 'create', 'update'],
    analytics: ['read'],          // Can view class analytics
  },
  ADMIN: {
    courses: ['admin'],
    lessons: ['admin'],
    questions: ['admin'],
    exams: ['admin'],
    labs: ['admin'],
    flashcards: ['admin'],
    ai_tutor: ['admin'],
    users: ['admin'],
    classes: ['admin'],
    analytics: ['admin'],
  },
};

// ============ PERMISSION CHECKS ============

/**
 * Check if a role has permission for an action on a resource
 */
export function hasPermission(
  role: Role,
  resource: Resource,
  action: Action
): boolean {
  const rolePermissions = PERMISSIONS[role];
  if (!rolePermissions) return false;
  
  const resourcePermissions = rolePermissions[resource];
  if (!resourcePermissions) return false;
  
  // Admin permission includes all actions
  if (resourcePermissions.includes('admin')) return true;
  
  return resourcePermissions.includes(action);
}

/**
 * Check if user has permission
 */
export function canAccess(
  user: AuthUser | null,
  resource: Resource,
  action: Action
): boolean {
  if (!user) return false;
  return hasPermission(user.role as Role, resource, action);
}

/**
 * Check if user is at least a certain role level
 */
export function hasRoleLevel(user: AuthUser | null, minimumRole: Role): boolean {
  if (!user) return false;
  return ROLE_HIERARCHY[user.role as Role] >= ROLE_HIERARCHY[minimumRole];
}

/**
 * Require user to have specific permission - throws if not authorized
 */
export function requirePermission(
  user: AuthUser | null,
  resource: Resource,
  action: Action
): void {
  if (!canAccess(user, resource, action)) {
    throw new Error(`Forbidden - ${action} on ${resource} requires higher permission`);
  }
}

/**
 * Require minimum role level - throws if not authorized
 */
export function requireRoleLevel(user: AuthUser | null, minimumRole: Role): void {
  if (!hasRoleLevel(user, minimumRole)) {
    throw new Error(`Forbidden - Requires ${minimumRole} or higher`);
  }
}

/**
 * Alias for requirePermission - check if user has permission for an action on a resource
 */
export function requireRole(
  user: AuthUser | null,
  resource: Resource,
  action: Action
): void {
  requirePermission(user, resource, action);
}

// ============ RESOURCE OWNERSHIP ============

/**
 * Check if user owns a resource
 */
export function isOwner(user: AuthUser | null, ownerId: string): boolean {
  if (!user) return false;
  return user.id === ownerId;
}

/**
 * Check if user can modify a resource (owner or admin)
 */
export function canModify(
  user: AuthUser | null,
  ownerId: string,
  resource: Resource,
  action: Action
): boolean {
  if (!user) return false;
  
  // Owner can always modify their own resources
  if (isOwner(user, ownerId)) return true;
  
  // Admins can modify anything
  if (user.role === 'ADMIN') return true;
  
  // Teachers can modify certain resources
  if (user.role === 'TEACHER') {
    const teacherResources: Resource[] = ['courses', 'lessons', 'questions', 'exams', 'labs', 'classes'];
    if (teacherResources.includes(resource)) {
      return hasPermission('TEACHER', resource, action);
    }
  }
  
  return false;
}

// ============ BATCH PERMISSION CHECKS ============

/**
 * Check multiple resources at once
 */
export function checkPermissions(
  user: AuthUser | null,
  requests: { resource: Resource; action: Action }[]
): boolean[] {
  return requests.map(req => canAccess(user, req.resource, req.action));
}

/**
 * Filter list to only what user can access
 */
export function filterAccessible<T extends { id: string; teacherId?: string; userId?: string }>(
  user: AuthUser | null,
  items: T[],
  resource: Resource,
  action: Action
): T[] {
  if (!user) return [];
  
  // Admin sees everything
  if (user.role === 'ADMIN') return items;
  
  // Teachers see their own items and class items
  if (user.role === 'TEACHER') {
    return items.filter(item => {
      const isTeacher = (item as { teacherId?: string }).teacherId === user.id;
      const isOwner = (item as { userId?: string }).userId === user.id;
      return isTeacher || isOwner || hasPermission('TEACHER', resource, action);
    });
  }
  
  // Students see public items and their own
  return items.filter(item => {
    const isOwner = (item as { userId?: string }).userId === user.id;
    return isOwner || hasPermission('STUDENT', resource, action);
  });
}

// ============ ROLE LABELS ============

export const ROLE_LABELS: Record<Role, string> = {
  STUDENT: 'Học sinh',
  TEACHER: 'Giáo viên',
  ADMIN: 'Quản trị viên',
};

export const ACTION_LABELS: Record<Action, string> = {
  read: 'Xem',
  create: 'Tạo mới',
  update: 'Cập nhật',
  delete: 'Xóa',
  admin: 'Quản lý',
};

/**
 * Get readable permission description
 */
export function getPermissionDescription(role: Role, resource: Resource): string {
  const permissions = PERMISSIONS[role][resource];
  if (!permissions || permissions.length === 0) {
    return 'Không có quyền truy cập';
  }
  
  if (permissions.includes('admin')) {
    return 'Toàn quyền';
  }
  
  return permissions.map(p => ACTION_LABELS[p]).join(', ');
}