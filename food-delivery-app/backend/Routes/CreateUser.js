const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

// Route to create a new user
router.post(
    '/createUser',
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('location').not().isEmpty().withMessage('Location is required'),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ success, message: 'User with this email already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);

            // Create the new user
            const user = await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location,
            });

            const payload = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            console.error('Error during user registration:', error.message);
            res.status(500).json({ success, message: 'Internal Server Error' });
        }
    }
);

// Route to login a user
router.post(
    '/loginUser',
    [
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success, message: 'Invalid email or password' });
            }

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ success, message: 'Invalid email or password' });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
            success = true;
            res.json({ success, authToken });
        } catch (error) {
            console.error('Error during user login:', error.message);
            res.status(500).json({ success, message: 'Internal Server Error' });
        }
    }
);

module.exports = router;
