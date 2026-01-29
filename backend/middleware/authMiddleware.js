import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) return res.status(401).json("No token");

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Invalid token");

    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
