const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Register = require('../modules/UserSchema');
const Router = express.Router();
const Signin = require('../modules/Signin');
const bcrypt = require('bcrypt');
const secretKey = 'mytestsecretkey'

// Replace 'your-generated-secret-key' with the key generated using the provided script


Router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await Register.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a JSON Web Token (JWT)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secretKey    );
      // console.log(token);

      res.status(200).json({ userId: user._id, token });
      } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Router;
