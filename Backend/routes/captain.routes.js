const express = require("express");
const { body } = require("express-validator");
const { registerCaptain,loginCaptain,captainProfile,logoutCaptain } = require("../controllers/captain.controller.js");
const { authCaptain } = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 3 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be atleast 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "auto", "motorcycle"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);
router.post("/login",[
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({min:1}) .withMessage("Enter a password")
],loginCaptain)

router.get("/profile",authCaptain,captainProfile)
router.get("/logout",authCaptain,logoutCaptain)
module.exports = router;
