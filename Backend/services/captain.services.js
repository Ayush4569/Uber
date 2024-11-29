const Captain = require("../models/captain.model.js");

async function createCaptain({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) 
{
  if (
    [firstname, lastname, email, password, color, plate, vehicleType].some(
      (field) => field?.trim() === "" || field == null
    ) &&
    !capacity
  ) {
    throw new Error("All fields are required");
  }
  const captain = await Captain.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  
  return captain;
}

module.exports = { createCaptain };
