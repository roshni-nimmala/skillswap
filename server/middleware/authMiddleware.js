
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Read the Authorization header
    const authHeader = req.headers.authorization;

    // Check whether the token was provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Please log in."
      });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];

    // Verify the token using our secret
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Make the authenticated user's ID available
    req.user = decoded;

    // Allow the request to continue
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = authMiddleware;
