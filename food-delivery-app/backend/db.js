const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');

        const fetchedData = await mongoose.connection.db.collection('food_items').find({}).toArray();
        const fetchedCategories = await mongoose.connection.db.collection('foodCategory').find({}).toArray();

        global.food_items = fetchedData;
        global.foodCategory = fetchedCategories;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectToMongo;
