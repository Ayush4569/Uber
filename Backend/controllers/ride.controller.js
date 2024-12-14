const { validationResult } = require("express-validator");
const { createRide } = require("../services/ride.service");

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

module.exports = {startRide}