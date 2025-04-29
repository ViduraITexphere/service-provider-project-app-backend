const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: String,
    country: String,
    userId: String, // Added to match frontend
});

module.exports = mongoose.model('City', citySchema);
