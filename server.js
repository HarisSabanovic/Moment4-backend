const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

let port = process.env.PORT


//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/users_database").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error + " Error connecting to database")
})

//ROutes
app.use("/api", authRoutes);

// Starta applikation
app.listen(port, () => {
    console.log(`server running att http://localhost:${port}`);
})