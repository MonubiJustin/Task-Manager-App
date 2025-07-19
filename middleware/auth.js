const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ msg: "Access Denied. No auth token provided" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ msg: "Access denied. No auth token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
