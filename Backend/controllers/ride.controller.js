const { validationResult } = require("express-validator");
const { createRide, getFare, confirmRide } = require("../services/ride.service");
const { getAddressCoordinates, getCaptainInTheRadius } = require("../services/maps.services");
const { sendMessageToSocketId } = require("../socket");
const { Ride } = require("../models/ride.model");

const createNewRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const  {pickup,destination,vehicleType} = req.body;
    try {
        const ride = await createRide({user:req.user._id,pickup,destination,vehicleType})
         res.status(200).json(ride)
         const pickupCoordinates = await getAddressCoordinates(pickup);
        //  console.log("pickup:",pickupCoordinates);
         const captainsInRadius = await getCaptainInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,2)
        //  console.log("captains",captainsInRadius);
         ride.otp  = null;
         const rideWithUserInfo = await Ride.findOne({_id:ride._id}).populate("user")
         captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUserInfo
            })
         })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}
const calculateFare = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const confirmUserRide = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    try {
        const confirmedRide = await confirmRide({rideId,captain:req.captain})
        // send msg to user that their ride is accepted
        sendMessageToSocketId(confirmedRide.user.socketId,{
            event:'confirm-ride',
            data:confirmedRide
        })
        return res.status(200).json(confirmedRide)
    } catch (error) {
        // console.log(error);
        return res.status(500).json({ message: error.message });
    }

}
module.exports = {createNewRide,calculateFare,confirmUserRide}