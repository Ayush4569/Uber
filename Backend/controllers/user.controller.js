const { validationResult } = require("express-validator");
const User = require("../models/user.model.js");
const { createUser } = require("../services/user.services.js");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req); // get the erros from user route if any
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { fullname, email, password } = req.body;
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
  res.cookie("token",token)
  return res.status(200).json({user,token})

};

const userProfile = async(req,res,next)=>{
  return res.status(200).json(req.user)
}
module.exports = { registerUser, loginUser,userProfile };