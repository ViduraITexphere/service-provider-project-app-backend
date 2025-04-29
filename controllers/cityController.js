// const City = require('../models/cityModel');

// exports.saveCity = async (req, res) => {
//     const { name, country, userId } = req.body;

//     const city = new City({ name, country, userId });

//     try {
//         await city.save();
//         res.status(201).json({ message: 'City saved successfully!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error saving city' });
//     }
// };

// exports.getCities = async (req, res) => {
//     try {
//         const cities = await City.find();
//         res.status(200).json(cities);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching cities' });
//     }
// };


const City = require('../models/cityModel');

exports.saveCity = async (req, res) => {
    const { name, country } = req.body;

    try {
        const city = new City({
            name,
            country,
            userId: req.user.id,  // userId from JWT
        });

        await city.save();
        res.status(201).json({ message: 'City saved successfully!' });
    } catch (error) {
        console.error('Error saving city:', error);
        res.status(500).json({ message: 'Error saving city' });
    }
};

exports.getCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ message: 'Error fetching cities' });
    }
};
