const express = require("express");
const { query } = require("express-validator");
const { authUser } = require("../middlewares/auth.middleware");
const {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
} = require("../controllers/map.controller");
const router = express.Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);
router.get(
  "/get-distance-time",
  [
    query("origin").isString().isLength({ min: 3 }),
    query("destination").isString().isLength({ min: 3 }),
  ],
  authUser,
  getDistanceTime
);
router.get(
  "/get-suggestions",
  query("location").isString(),
  authUser,
  getAutoCompleteSuggestions
);
module.exports = router;
