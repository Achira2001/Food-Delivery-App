const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Route to add food items to the database
router.post('/add', async (req, res) => {
    try {
        await FoodItem.insertMany(foodData);
        res.status(201).json({ message: "Food items added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to add food items" });
    }
});

// Route to get all food items
router.get('/all', async (req, res) => {
    try {
        const foodItems = await FoodItem.find({});
        res.status(200).json(foodItems);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch food items" });
    }
});

module.exports = router;
