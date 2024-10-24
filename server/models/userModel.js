const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add your email"],
            unique: true, 
            match: [/.+@.+\..+/, "Please enter a valid email"], 
        },
        name: {
            type: String,
            required: [true, "Please add your name"],
        },
        dob: {
            type: Date,
            required: [true, "Please add your date of birth"],
        },
        number: {
            type: String,
            required: [true, "Please add your phone number"],
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], 
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
