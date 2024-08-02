const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/db.config");
const bcrypt = require("bcryptjs");
const initDB = require("./models/user.model.js");

app.use(express.json()); // Middleware

mongoose.connect(config.BD_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Connection failed");
});
db.once("open", () => {
    console.log("Connection Successful");
    init();
});

async function init() {
    try {
        const user = await initDB.findOne({ name: "Haider" });
        if (user) {
            console.log("User already existed");
        }
    } catch {
        console.log("Error while reading the data");
    }
}

require("./routes/auth.route.js")(app);
require("./routes/category.route.js")(app);

app.get("/", (req, res) => {
    res.send("I am a root");
});

app.listen(config.port, () => {
    console.log(`My server is running on ${config.port}`);
});
