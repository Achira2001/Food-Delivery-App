const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        const { email, order_data, order_date } = req.body;

        if (!email || !Array.isArray(order_data) || order_data.length === 0 || !order_date) {
            return res.status(400).json({ error: "Invalid request body. Please provide email, order_data array, and order_date." });
        }

        // Add order date as the first element of the order data array
        order_data.unshift({ Order_date: order_date });

        let eId = await Order.findOne({ email: email });

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

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email });
        if (myData) {
            res.json({ orderData: myData.order_data });
        } else {
            res.json({ orderData: [] }); // Return empty array if no orders found
        }
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
