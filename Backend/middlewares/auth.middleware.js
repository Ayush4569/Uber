const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const BlackListToken = require("../models/blackListToken.model");
const Captain = require("../models/captain.model");

const authUser = async (req, res, next) => {
    // console.log(req.headers);
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // console.log('token',token);
  // check whether the token is blacklisted or not if blacklisted then dont give authentication access
  const isBlackListedToken = await BlackListToken.findOne({token})
  if(isBlackListedToken){
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded',decodedToken);
    const user = await User.findById(decodedToken._id); // decodedToken is nothing but _id which we created using jwt.sign()
    // console.log('user',user);
    
    req.user = user;
    // console.log('req.user-',req.user);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized token expired" });
  }
};
const authCaptain = async(req,res,next)=>{
  // console.log(req.headers);
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
    const captain = await Captain.findById(decodedToken._id); // decodedToken is nothing but _id which we created using jwt.sign()
    // console.log(captain);
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized token expired" });
  }
}

module.exports = { authUser,authCaptain };
