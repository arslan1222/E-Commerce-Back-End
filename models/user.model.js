const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },

    userType: {
        type: String,
        required: true,
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN"]
    }
},{timestamps: true, versionKey: false});

module.exports = mongoose.model("User", userSchema);

// module.exports = User;