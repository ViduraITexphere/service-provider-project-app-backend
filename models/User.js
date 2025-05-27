const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        default: null,
    },
    council: {
        type: String,
        default: null, // Optional field to store the selected council
    },
    deviceId: {
        type: String,
        required: true,
        unique: true, // Ensures one device ID per user/device
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
