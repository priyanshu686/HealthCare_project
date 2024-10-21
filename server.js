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
const express = require('express');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// Error Handling Middleware
app.use(errorHandler);


// Routes Below
app.get('/',(req,res)=>{
    res.send("Working");
})

// App Config Start 
app.listen(port,()=>{
    console.log('Server running on port http://localhost:${port}');
});

