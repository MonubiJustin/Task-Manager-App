const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No auth token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. Token missing from Authorization header",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or malformed token",
    });
  }
};
