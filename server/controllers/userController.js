const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, dob, number, password } = req.body;

    // Check if all fields are provided
    if (!email || !name || !dob || !number || !password) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
        email,
        name,
        dob,
        number,
        password: hashedPassword, // Store the hashed password
    });

    res.status(201).json({ message: "User registered successfully", user });
});


module.exports = { registerUser };
