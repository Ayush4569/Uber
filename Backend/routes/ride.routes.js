const express = require("express");
const { body } = require("express-validator");
const router = express.Router()

router.post('/create',
    body("userId").isString().isLength({min:24,max:24}).withMessage("Invalid user id"),
    body("pickup").isString().isLength({min:3}).withMessage("Invalid pickup location"),
    body("destination").isString().isLength({min:3}).withMessage("Invalid drop location"),
    body("vehicleType").isString().isIn(['car','auto','motorcycle']).withMessage("Invalid vehicleType"),
)

module.exports  = router


