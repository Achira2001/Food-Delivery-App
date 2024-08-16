require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware to set headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log("Failed to connect to MongoDB", err);
    }
};

// Connect to MongoDB
mongoDB();

// Routes
const createUserRoutes = require('./Routes/CreateUser');
const foodItemsRoutes = require('./Routes/FoodItems');

app.use('/api/', createUserRoutes);
app.use('/api/food_items', foodItemsRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
