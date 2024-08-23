const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully');

        const fetchedData = await mongoose.connection.db.collection('food_items').find({}).toArray();
        const fetchedCategories = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
        global.food_items = fetchedData;
        global.foodCategory = fetchedCategories;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
