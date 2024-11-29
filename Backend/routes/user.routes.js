const {body} = require("express-validator");
const { registerUser, loginUser, userProfile,logoutUser } = require("../controllers/user.controller");
const express = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 3 characters long")
],registerUser)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:0}).withMessage("Enter a password")
],loginUser)

router.get("/profile",authUser,userProfile)
router.get("/logout",authUser,logoutUser)
module.exports  = router;