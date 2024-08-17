require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoDB = require('./db'); // Import MongoDB connection

const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS and parse JSON requests
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json()); // Middleware to parse JSON requests

// Initialize MongoDB connection
mongoDB()
    .then(() => {
        // Start the server only after MongoDB is connected
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the process with an error
    });

// Route definitions
app.use('/api/', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
