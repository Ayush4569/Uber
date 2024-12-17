const { Ride } = require("../models/ride.model");
const { getDistanceAndTime } = require("./maps.services");
const crypto = require("crypto")

const getFare = async (pickup, destination) => {
  if (!pickup && !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);

  const baseFare = {
    auto: 25,
    car: 45,
    moto: 15,
  };

  const perKmRate = {
    auto: 8,
    car: 12,
    moto: 6,
  };
  const perMinuteRate = {
    auto: 1.5,
    car: 2.5,
    moto: 1,
  };

  const fare = {
    auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
    car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
    moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
};
  return fare;
};

const generateOtp = (num)=>{
   return crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString()
}

const createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp:generateOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};

const confirmRide = async({rideId,captain})=>{
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  // update the ride details like captain id and status of ride
  await Ride.findByIdAndUpdate(rideId,{
    captain:captain._id,
    status:'accepted'
  })

  const ride = await Ride.findById(rideId).populate('user').populate('captain').select('+otp')
  if(!ride){
    throw new Error("Ride not exisits");
  }
  return ride
}
module.exports = { createRide,getFare,confirmRide };
