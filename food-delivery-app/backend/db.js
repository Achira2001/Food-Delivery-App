const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        console.log(fetchedData);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

module.exports = mongoDB;
