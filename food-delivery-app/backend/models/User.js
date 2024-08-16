const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users have the same email
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Automatically sets the current date
    },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
