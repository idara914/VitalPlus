import pool from './../config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify JWT and check user roles
export const authorize = (roles = []) => {
  // If a single role is passed as a string, convert it to an array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: 'Access denied: No or malformed token' });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length > 0) {
        // Check user roles
        const { rows: userRoles } = await pool.query(
          `SELECT r.name FROM roles r
             JOIN user_roles ur ON r.id = ur.role_id
             WHERE ur.user_id = $1`,
          [req.user.id]
        );

        const userRolesArray = userRoles.map(role => role.name);
        const hasRole = roles.some(role => userRolesArray.includes(role));

        if (!hasRole) {
          return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
