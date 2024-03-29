const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  avtar: { type: String },
  phone: { type: String },

});


const User = mongoose.model('User', userSchema);

module.exports = User;
