const express = require("express");
const router = express.Router();
const { registerUser, loginUser,getUserProfile,updateUserProfile } = require("../controllers/userController");
//const {jwtAuthMiddleware} = require("../middlewares/jwtAuthMiddleware");
const {generateJwtToken,validateJwtToken} = require("../middlewares/jwtAuthMiddleware");

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login",generateJwtToken, loginUser);

router.get("/myaccount",validateJwtToken,getUserProfile)

router.patch("/myaccount",validateJwtToken,updateUserProfile)

module.exports = router;