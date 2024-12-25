const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters"]
        },
        lastname:{
            type:String,
            minlength:[3,"Last name must be at least 3 characters"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"Email must be atleast 5 characters"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[6,"Password must be atleast 5 characters"]
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        name:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true,
            minlength:[3,"Color name must be at least 3 characters"]

        },
        plate:{
            type:String,
            required:true,
            unique:true,
            minlength:[3,"Plate number must be at least 3 characters"]

        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be at least 1 "]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","auto","motorcycle"]
        },

    },
    location:{
        // describe the latitude and longitude of the location
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        },
    }
})

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

captainSchema.methods.generateAuthToken = function (){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
const Captain = mongoose.model("Captain",captainSchema);
module.exports = Captain;