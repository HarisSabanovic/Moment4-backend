const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

let port = process.env.PORT;

//ROutes
app.use("/api", authRoutes);

// Starta applikation
app.listen(port, () => {
    console.log(`server running att http://localhost:${port}`);
})