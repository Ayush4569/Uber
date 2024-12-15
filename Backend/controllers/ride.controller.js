const { validationResult } = require("express-validator");
const { createRide, getFare } = require("../services/ride.service");

const startRide = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const  {pickup,destination,vehicleType} = req.body;
    try {
        const ride = await createRide({user:req.user._id,pickup,destination,vehicleType})
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const calculateFare = async (req,res)=>{
    console.log('query',req.query);
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
module.exports = {startRide,calculateFare}