const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleWare = async (req, res, next) => {
    console.log(req.headers);
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id); // decodedToken is nothing but _id which we created using jwt.sign()

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized token expired" });
  }
};

module.exports = { authMiddleWare };
