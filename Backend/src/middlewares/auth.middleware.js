const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

//Authentication Middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized:  Token Required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    //User existence check
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    //Attach user info to request object
    req.user = {
      userId: user._id,
      role: user.role, 
      email: user.email,
      name: user.name,
    };
    //Proceed to next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
