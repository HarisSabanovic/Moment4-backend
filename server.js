const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

let port = process.env.PORT;

//ROutes
app.use("/api", authRoutes);

//protected route
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Inloggad på skyddad server"})
})

// Starta applikation
app.listen(port, () => {
    console.log(`server running att http://localhost:${port}`);
})