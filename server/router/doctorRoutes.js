const express = require("express");
const router = express.Router();
// const {jwtAuthMiddlewares} = require("../middlewares/jwtAuthMiddleware");
const {generateJwtToken,validateJwtToken} = require("../middlewares/jwtAuthMiddleware");
// const { registerDoctor,deleteDoctor} = require("../controllers/doctorsDetailsController"); // Ensure the path is correct
const { registerDoctor, deleteDoctor, getAllDoctors, getDoctorByEmail } = require("../controllers/doctorsDetailsController");

// Route to register a doctor
router.post("/register",generateJwtToken, registerDoctor);
router.delete("/delete/:email", deleteDoctor);


// Route to get all doctors
router.get("/",generateJwtToken, getAllDoctors); // This route will return all doctors

// Route to get a specific doctor by email
router.get("/email/:email", getDoctorByEmail); // This route will return a specific doctor by email


module.exports = router;