export const requireRole = (...roles) => {
  return (req, res, next) => {
    console.log(req.userRole);
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ success: false, message: "Forbidden: insufficient permissions" });
    }
    next();
  };
};

