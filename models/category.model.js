const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    }
},{ timestamps: true, versionKey: false});  // timstamp will give the values of createdAt & modifidAt by defoullt // version delete the mongoose version id

module.exports = mongoose.model("category", categorySchema);