const axios = require("axios");
const getAddressCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.GOOGLE_MAPS_API}`
    );
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      console.error("Geocoding request failed:", response.data.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const getDistanceAndTime = async (origin, destination) => {
  if (!origin && !destination) {
    throw new Error("Origin and destination are required");
  }
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.rows[0].elements[0];
    } else {
      console.error(
        "Distance calculation request failed:",
        response.data.status
      );
      return null;
    }
  } catch (error) {
    console.error("Error calculating distance:", error);
    return null;
  }
};

const getLocationSuggestions = async (location) => {
  if (!location) {
    throw new Error("Location is required");
  }
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    location
  )}&key=${process.env.GOOGLE_MAPS_API}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { getAddressCoordinates, getDistanceAndTime,getLocationSuggestions };
