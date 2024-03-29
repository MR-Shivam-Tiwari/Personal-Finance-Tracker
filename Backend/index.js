const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user'); 
const financialDataRoutes = require('./routes/financialDataRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
connectDB();

app.get('/get-profile', async (req, res) => {
    try {
        const { email } = req.query;

        // Check if the required email is present
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Fetch user profile from the database based on the provided email
        const user = await User.findOne({ email });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api/financialdata', financialDataRoutes);


app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
