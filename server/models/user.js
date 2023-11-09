const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    city: {
        type: String,
    },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
