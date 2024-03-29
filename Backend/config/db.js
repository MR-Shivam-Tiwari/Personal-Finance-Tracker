const mongoose = require('mongoose');
const User = require('../models/user'); // Import the User model

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://shivamt2023:ft123shivam123@cluster0.nii0kqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Ensure the geospatial index is created for the 'location' field in the User model
    await User.syncIndexes();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
