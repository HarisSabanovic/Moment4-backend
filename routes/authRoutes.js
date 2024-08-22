// routes for author
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//connect to mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(error + " Error connecting to database")
})

//user model
const User = require("../models/user")

//add a user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;


        //Validate Input
        if(!username || username.length < 4) {
             return res.status(400).json({ error: "Invalid username"});
        }

        if(!password || password.length < 4) {
             return res.status(400).json({ error: "Invalid password"});
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        //correct - save user
        const user = new User({username, password});
        await user.save();

        res.status(201).json({message: "User created"});


    } catch (error){
        res.status(500).json({error: "Server error"});
    }
})

//login user
router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;


        //Validate Input
        if(!username || !password) {
             return res.status(400).json({ error: "Invalid username/password"});
        }

        //does user exist
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(400).json({ error: "User does not exist"});
        } 

        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid password"});
        } else {

            //create jwt
            const payload = {username: username};
            const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h"});
            const response = {
                message: "User logged in",
                token: token
            }
            res.status(200).json({ response });
        }
    } catch (error){
        res.status(500).json({ error: "Server error"});
    }
})

module.exports = router;