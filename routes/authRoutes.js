// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { body, validationResult } = require('express-validator');
// const User = require('../models/User');

// const router = express.Router();

// // Register Route
// router.post(
//     '/register',
//     [
//         body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters'),
//         body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { username, password } = req.body;

//         try {
//             // Check if the user exists
//             const userExists = await User.findOne({ username });
//             if (userExists) return res.status(400).json({ message: 'User already exists' });

//             // Hash password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);

//             // Create new user
//             const newUser = new User({
//                 username,
//                 password: hashedPassword,
//             });

//             await newUser.save();
//             res.status(201).json({ message: 'User registered successfully' });
//         } catch (err) {
//             res.status(500).json({ message: 'Server error during registration' });
//         }
//     }
// );

// // Login Route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Check if user exists
//         const user = await User.findOne({ username });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         // Generate JWT token
//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };

//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error during login' });
//     }
// });

// module.exports = router;


// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Register route
// router.post('/register', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Registration error:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Return the user ID with the message
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: newUser._id,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Login route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
//         return res.status(200).json({ token });
//     } catch (error) {
//         console.error('Login error:', error);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });


// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1h' }
        );

        // ✅ Include userId in the response
        return res.status(200).json({
            token,
            userId: user._id, // send this to store in AsyncStorage
            username: user.username // optional, for display
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Update user's city
router.put('/:userId/city', async (req, res) => {
    const { userId } = req.params;
    const { city } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { city },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'City updated successfully', user: updatedUser });
    } catch (error) {
        console.error('City update error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;

