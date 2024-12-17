const SocketIo = require("socket.io");
const User = require("./models/user.model");
const Captain = require("./models/captain.model");

let io ;

function initializeSocket(server) {
  io =  SocketIo(server, {
    cors: {
      // origin: "http://localhost:5173",
      origin: "*",
      methods: ["GET", "POST"],
      // credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on('join',async(data)=>{
      const {userId,userType} = data;
      // console.log(data);
      if(userType === 'user'){
        await User.findByIdAndUpdate(userId,{socketId:socket.id})
      }
      else{
        await Captain.findByIdAndUpdate(userId,{socketId:socket.id})
      }
    })
    socket.on('update-location-captain',async(data)=>{
      const {userId,location} = data
      if(!location || !location.ltd || !location.lng){
        return socket.emit('error',{message:'Invalid location'})
      }
      await Captain.findByIdAndUpdate(userId,{
        location:{
          ltd:location.ltd,
          lng:location.lng
        }
      })
    })
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("socket is not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
