const express = require("express");
const { body, query } = require("express-validator");
const { createNewRide, calculateFare, confirmUserRide } = require("../controllers/ride.controller");
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
module.exports = router;
