// Express Check
// const express = require('express');
// const app = express();
// const PORT = 3000;

// // Middleware (optional)
// app.use(express.json());

// // Define a simple route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Start the server
// app.listen(PORT, () => {

//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// FrameWork 
// Import express
//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, '/views/partials'));


const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(errorHandler);

// ERROR handling middleware
app.use(errorHandler);

app.set('view engine', 'hbs');
 
// Route for User Registration and Authentication
app.use("/api/register",require("./router/userRoutes"));

//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

app.get("/home",(req,res)=>{
    res.render("home",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})


app.get("/allusers",(req,res)=>{
    res.render("users",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})



// APP CONFIG START
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
