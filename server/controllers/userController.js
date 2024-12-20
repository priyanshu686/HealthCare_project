const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Corrected variable name to 'User'
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    // Validate all required fields
    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }
  
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // Check if the password matches (using bcrypt to compare hashed passwords)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // If login is successful, send a response (no token, just user details)
    res.status(200).json({
      message: "Login successful",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  });


const getUserProfile = asyncHandler(async(req,res)=>{
   const {email} = req.body;
   const data = await User.findOne({email});
   if(!data) return res.status(401).json({error:"Not Found"});
   return res.status(200).json({Data});
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const {email} = req.body; 
  const { firstName, lastName, age, gender, bloodGroup, phoneNumber, password } = req.body;

  
  const data = await User.findById({email});

  if (!data) {
      return res.status(401).json({ message: "User not found" });
  }
  if (password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(password, salt);
  }
  data.firstName = firstName || data.firstName;
  data.lastName = lastName || data.lastName;
  data.email = email || data.email;
  data.age = age || data.age;
  data.gender = gender || data.gender;
  data.bloodGroup = bloodGroup || data.bloodGroup;
  data.phoneNumber = phoneNumber || data.phoneNumber;

  const updatedUser = await data.save(); 

  res.json({
      message: "Profile updated successfully",
      user: updatedUser
  });
});
module.exports = { registerUser, loginUser,getUserProfile ,updateUserProfile};
