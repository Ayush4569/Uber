const User = require("../models/user.model.js");

async function createUser({firstname,lastname,email,password}){
  if(!firstname,!email,!password){
    throw new Error("All fields are required")
  }
  const user = await User.create({
    fullname:{
        firstname,
        lastname
    },
    email,
    password
  })

  return user
}

module.exports = {createUser}