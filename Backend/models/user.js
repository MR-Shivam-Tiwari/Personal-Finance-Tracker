const mongoose = require('mongoose');
const { ObjectID } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  avtar: { type: String },
  phone: { type: String },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  followers: [{ type: ObjectID, ref: 'User' }],
  followings: [{ type: ObjectID, ref: 'User' }],
  trips: [{ type: ObjectID, ref: 'Trip' }], // Add the trips field
});

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
