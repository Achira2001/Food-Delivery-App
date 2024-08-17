const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const fetchedCategories = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.food_items = fetchedData;
        global.foodCategory = fetchedCategories;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err; // Re-throw error to handle in the calling function
    }
};

module.exports = mongoDB;
