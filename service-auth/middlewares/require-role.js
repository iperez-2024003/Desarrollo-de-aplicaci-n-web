'use strict';

import {
  SUPER_ADMIN_ROLE,
  MANAGER_ROLE,
  USER_ROLE,
} from '../helpers/role-constants.js';

export const requireRole = (...allowedRoles) => {
  const set = new Set(allowedRoles.map((r) => (r || '').toUpperCase()));
  return async (req, res, next) => {
    try {
      const roles = req.userRoleNames || [];
      const hasRole = roles.some((r) => set.has((r || '').toUpperCase()));
      if (!hasRole) {
        const roleList = [...set].join(' o ');
        return res.status(403).json({
          success: false,
          message: `Acción no permitida. Solo el rol ${roleList} puede realizar esta operación.`,
        });
      }
      next();
    } catch (err) {
      console.error('Error en requireRole:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al verificar permisos',
      });
    }
  };
};

export const requireSuperAdmin = requireRole(SUPER_ADMIN_ROLE);

export const requireManager = requireRole(MANAGER_ROLE);

export const requireUser = requireRole(USER_ROLE);
