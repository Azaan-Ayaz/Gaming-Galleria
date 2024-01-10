 const colors = require('colors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')

const DataBase = async()=>{
try {
    await mongoose.connect("mongodb://localhost:27017/Project")
        console.log(`DataBase is Connected to Server `.bgGreen.black);
} catch (error) {
    console.log({
        message: "DataBase is not connected",
        error : error
    });
}
}
module.exports = DataBase