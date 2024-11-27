const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const userRoutes = require('./routes/user.routes.js')
const cookieParser = require('cookie-parser')
const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use("/users",userRoutes)
module.exports = app;