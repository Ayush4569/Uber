const { validationResult } = require("express-validator");
const User = require("../models/user.model.js");
const { createUser } = require("../services/user.services.js");
const BlackListToken = require("../models/blackListToken.model.js");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req); // get the erros from user route if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { fullname, email, password } = req.body;
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exist" });
  }
  const hashedPassword = await User.hashPassword(password);
  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  return res.status(201).json({ user, token });
};

const loginUser = async (req, res, next) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  const user = await User.findOne({email}).select("+password")
  if(!user){
    return res.status(401).json({message:"No such user exists"})
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect){
    return res.status(401).json({message:"Incorrect password"})
  }

  const token =  user.generateAuthToken()
  // console.log(token);
  res.cookie("token", token, { httpOnly: true });
  return res.status(200).json({user,token})

};

const userProfile = async(req,res,next)=>{
  return res.status(200).json(req.user)
}

const logoutUser = async(req,res,next)=>{
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  console.log(token);
  // add this token to blacklist and then clear it from cookies
  await BlackListToken.create({token});

  res.clearCookie('token');

  return res.status(200).json({message:"Logged out"})
}
module.exports = { registerUser, loginUser,userProfile,logoutUser };
