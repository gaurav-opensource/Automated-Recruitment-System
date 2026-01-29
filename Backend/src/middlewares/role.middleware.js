const role = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // req.user is set by auth.middleware
      if (!req.user || !req.user.role) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Role not found.",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = role;
