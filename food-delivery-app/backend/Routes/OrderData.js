const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        console.log('Received order data:', { email, order_data, order_date });

        if (!email || !Array.isArray(order_data) || order_data.length === 0 || !order_date) {
            return res.status(400).json({ error: "Invalid request body. Please provide email, order_data array, and order_date." });
        }

        order_data.splice(0, 0, { Order_date: order_date });

        let eId = await Order.findOne({ email: email });
        console.log('Existing order:', eId);

        if (eId === null) {
            await Order.create({
                email: email,
                order_data: [order_data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            );
            res.json({ success: true });
        }
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
