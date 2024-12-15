const { Server } = require("socket.io");
const User = require("./models/user.model");
const Captain = require("./models/captain.model");

let io = undefined;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on('join',async(data)=>{
      const {userId,userType} = data;
      console.log(data);
      if(userType === 'user'){
        await User.findByIdAndUpdate(userId,{socketId:socket.id})
      }
      else{
        await Captain.findByIdAndUpdate(userId,{socketId:socket.id})
      }
    })
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("socket is not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
