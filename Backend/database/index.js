const mongoose = require('mongoose');

 function connectDB (){
        mongoose.connect(process.env.MONGODB_URL)
        .then((connection)=>{
            console.log(`MONGODB connected !! -> ${connection.connection.name.toUpperCase()} PROJECT`);
        })
        .catch((error)=>{
            console.log("Error connecting datase :",error);
            process.exit(1)
        })
}

module.exports = connectDB