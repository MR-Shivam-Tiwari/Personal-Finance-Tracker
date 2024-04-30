const mongoose = require('mongoose');

const ROLES = {
    SUPER_ADMIN: 'super admin',
    DEPARTMENT_HEAD: 'department head',
    PROJECT_LEAD: 'project lead',
    MEMBER: 'member',
  };
  
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.MEMBER,
    },
    roleNumericValue: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 3,
    },
    department: {
      type: String,
      required: true,
    },
    profileLevel: {
      type: Number,
      enum: [0, 1, 2, 3], // Define your profile levels
      default: 3, // Default to 'member' profile level
    },
    reportingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Userlevels = mongoose.model('Userlevels', userSchema);

// Create a new user
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
};

// Retrieve all users
const getAllUsers = async () => {
  try {
    const users = await Userlevels.find();
    console.log('All users:', users);
    return users;
  } catch (error) {
    console.error('Error retrieving users:', error.message);
    throw error;
  }
};

// Update a user
const updateUser = async (userId, updatedUserData) => {
  try {
    const updatedUser = await Userlevels.findByIdAndUpdate(userId, updatedUserData, { new: true });
    console.log('User updated:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const deletedUser = await Userlevels.findByIdAndDelete(userId);
    console.log('User deleted:', deletedUser);
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
