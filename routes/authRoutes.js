// routes for author
const express = require("express");
const router = express.Router();

//add a user
router.post("/register", async (req, res) => {
    console.log("Register called...");
})

//login user
router.post("/login", async (req, res) => {
    console.log("Login called...");
})

module.exports = router;