const express = require('express')
const router = express.Router()
const User = require('../models/user')





router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: 'email, password, and username are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, password, username });
        await newUser.save();

        console.log('User registered successfully:', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});







// userRoutes.js
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user in the database
        const user = await User.findOne({ email, password });

        if (user) {
            // Assuming your user schema has an 'id' field
            const userId = user.id;

            res.status(200).json({ message: 'Login Successful', userId });
        } else {
            // User not found in the database
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});



router.post('/update-profile', async (req, res) => {
    try {
        const { email, name, bio, phone, avtar } = req.body;

        console.log('User to be updated:', email);

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { name, bio, phone, avtar } },
            { new: true }
        );

        console.log('Updated user:', updatedUser);

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});







module.exports = router;