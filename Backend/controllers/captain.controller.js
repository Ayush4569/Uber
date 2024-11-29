const { validationResult } = require("express-validator");
const Captain = require("../models/captain.model.js");
const { createCaptain } = require("../services/captain.services.js");
const BlackListToken = require("../models/blackListToken.model.js");

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  const isCaptainExists = await Captain.findOne({ email });
  if (isCaptainExists) {
    return res.status(400).json({ message: "Captain already exist" });
  }
  const hashedPassword = await Captain.hashPassword(password);
  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  const token = captain.generateAuthToken();
  return res.status(201).json({ captain, token });
};

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  const captain = await Captain.findOne({email}).select("+password")
  if(!captain){
    return res.status(401).json({message:"No such captain exists"})
  }
  const isPasswordCorrect = await captain.comparePassword(password);
  if(!isPasswordCorrect){
    return res.status(401).json({message:"Incorrect password"})
  }

  const token =  captain.generateAuthToken()
  res.cookie("token",token)
  return res.status(200).json({captain,token})

};
const captainProfile = async (req,res,next)=>{
  return res.status(200).json(req.captain)
}
const logoutCaptain = async (req,res,next)=>{
 const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
 // blacklist this token
  await BlackListToken.create({token});
  res.clearCookie("token");
  return res.status(200).json({message:"Logged out"})
}
module.exports = { registerCaptain,loginCaptain,captainProfile,logoutCaptain };
