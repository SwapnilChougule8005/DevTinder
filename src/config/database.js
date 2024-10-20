const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://swapnilchougule8005:iE7Cd3aGUvQ4xVTk@codecraft.k3veh.mongodb.net/DevTinder")
    //await mongoose.connect("mongodb+srv://codecraft.k3veh.mongodb.net/")
}

module.exports = connectDB;


