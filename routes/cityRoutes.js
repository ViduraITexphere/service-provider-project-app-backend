// const express = require('express');
// const router = express.Router();
// const cityController = require('../controllers/cityController');

// // Save a city
// router.post('/city', cityController.saveCity);

// // Get all cities
// router.get('/cities', cityController.getCities);

// module.exports = router;


const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const authMiddleware = require('../middleware/auth'); // for protected routes

// Save city (protected)
router.post('/city', authMiddleware, cityController.saveCity);

// Get all cities
router.get('/cities', cityController.getCities);

module.exports = router;
