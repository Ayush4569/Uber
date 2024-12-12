const { validationResult } = require("express-validator");
const {
  getAddressCoordinates,
  getDistanceAndTime,
  getLocationSuggestions,
} = require("../services/maps.services");

const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(400).json({ message: "Coordinates not found" });
  }
};

const getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  try {
    const distanceTime = await getDistanceAndTime(origin, destination);
    return res.status(200).json(distanceTime);
  } catch (error) {
    return res.status(400).json({ message: "Distance time not found" });
  }
};

const getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { location } = req.query;
  try {
    const suggestions = await getLocationSuggestions(location);
    return res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Suggestions not found" });
  }
};
module.exports = { getCoordinates, getDistanceTime,getAutoCompleteSuggestions };
