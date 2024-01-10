const app = require("./app")
const colors = require("colors")
const dotenv = require("dotenv").config()
 
const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.clear()
    console.log(`Server is Running on ${process.env.MODE} on Port ${PORT}`.bgMagenta.black);
})