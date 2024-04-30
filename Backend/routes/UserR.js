// const { default: mongoose } = require("mongoose");

// const { json } = require("express");
const UserSchema = require("../config/UserSchema");
const express = require("express");
const mongoose = require("mongoose");
const Router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");

const storage = multer.memoryStorage(); // Store the file as a Buffer in memory
const upload = multer({ storage: storage });

Router.post("/registration", async (req, res) => {
  const { name, mobilenumber, email, password, userRole } = req.body;
  // console.log(req.body,'sassasa')
  try {
    const existinguser = await UserSchema.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({ message: "already registerd" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRegister = new UserSchema({
      name,
      mobilenumber,
      email,
      password: hashedPassword,
      userRole,
    });
    await newRegister.save();
    res.status(201).json({ message: "registration successfuly" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});
Router.put("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profilePic = req.body.profilePic;
    // }

    // Update department if provided
    if (req.body.department) {
      user.department = req.body.department;
    }

    // Update designation if provided
    if (req.body.designation) {
      user.designation = req.body.designation;
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.mobilenumber) {
      user.mobilenumber = req.body.mobilenumber;
    }

    await user.save();

    // Respond with the updated user
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Router.get("/user/:userId", async (req, res) => {
  // console.log('test')
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

Router.get("/userData", async (req, res) => {
  try {
    const UserData = await UserSchema.find();
    const allUserData = UserData.map((item) => ({
      userId: item._id,
      name: item.name,
      email: item.email,
      userRole: item.userRole,
    }));
    res.json(allUserData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

Router.get("/registeredNames", async (req, res) => {
  try {
    const getData = await UserSchema.find();

    const userNamesEmail = getData.map((item) => ({
      userId: item._id,
      name: item.name,
      email: item.email,
    }));

    res.json(userNamesEmail);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

Router.put("/updateUserRole/:id", async (req, res) => {
  const { id } = req.params; // Get the user ID from the URL parameters
  const { userRole } = req.body; // Get the new userRole value from the request body

  if (!userRole) {
    return res.status(400).send("userRole is required.");
  }

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      { userRole: userRole },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send("The user with the given ID was not found.");
    }

    res.send(updatedUser);
    // console.log(updatedUser,"role")
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

Router.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

module.exports = Router;
