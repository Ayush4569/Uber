const express = require("express");
const { body } = require("express-validator");
const { startRide } = require("../controllers/ride.controller");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router()

router.post('/create',
    authUser,
    body("pickup").isString().isLength({min:3}).withMessage("Invalid pickup location"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid drop location"),
    body("vehicleType").isString().isIn(['car','auto','moto']).withMessage("Invalid vehicleType"),
    startRide

)

module.exports  = router

