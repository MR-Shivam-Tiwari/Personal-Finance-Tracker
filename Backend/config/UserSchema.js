const express = require("express");
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobilenumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  department: { type: String },
  designation: { type: String },
  userRole: { type: Number, },
  resetOTP:{type:Number},
});
const User = mongoose.model("User", registerSchema);
module.exports = User;
