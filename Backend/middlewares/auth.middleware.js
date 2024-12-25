const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const BlackListToken = require("../models/blackListToken.model");
const Captain = require("../models/captain.model");

const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // check whether the token is blacklisted or not if blacklisted then dont give authentication access
  const isBlackListedToken = await BlackListToken.findOne({token})
  if(isBlackListedToken){
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id);
    if(!user){
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    req.user = user;
    return next();
  } catch (error) {
    res.clearCookie('token');
    return res.status(401).json({ message: "Unauthorized token expired" });
  }
};
const authCaptain = async(req,res,next)=>{
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListedToken = await BlackListToken.findOne({token})
  if(isBlackListedToken){
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decodedToken._id); 
    if(!captain){
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized token expired" });
  }
}

module.exports = { authUser,authCaptain };
