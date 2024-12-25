const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const userRoutes = require('./routes/user.routes.js')
const captainRoutes = require('./routes/captain.routes.js')
const mapsRoutes = require('./routes/maps.routes.js')
const rideRoutes = require('./routes/ride.routes.js')
const cookieParser = require('cookie-parser')
const app = express()
connectDB()
app.use(cors({
    origin: ["http://localhost:5173","https://wtdg54m4-5173.inc1.devtunnels.ms"] ,
    credentials: true,              
  }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use("/users",userRoutes)
app.use("/captains",captainRoutes)
app.use("/maps",mapsRoutes)
app.use("/rides",rideRoutes)
module.exports = app;
