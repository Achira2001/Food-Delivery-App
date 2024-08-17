const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.json([global.food_items, global.foodCategory]); // Send the global data as JSON
    } catch (error) {
        console.error("Error retrieving food items:", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
