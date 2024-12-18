const express = require("express");
const { body, query } = require("express-validator");
const { createNewRide, calculateFare, confirmUserRide,startRide, endUserRide } = require("../controllers/ride.controller");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid drop location"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "moto"])
    .withMessage("Invalid vehicleType"),
    createNewRide
);
router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid drop location"),
  calculateFare
);
router.post('/confirm',
  authCaptain,
  body('rideId').isMongoId().withMessage("Invalid ride id"),
  confirmUserRide
)
router.get('/start-ride',
  authCaptain,
  query('rideId').isMongoId().withMessage("Invalid ride id"),
  query('otp').isString().isLength({min:6,max:6}).withMessage("Invalid otp"),
  startRide
)
router.patch('/end-ride',
  authCaptain,
  body('rideId').isMongoId().withMessage("Invalid ride id"),
  endUserRide
)
module.exports = router;
