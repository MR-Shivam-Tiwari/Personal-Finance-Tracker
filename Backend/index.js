const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const UserR = require('./Routes/UserR');
const Signinroutes = require('./Routes/Signinroutes');
const AddTask = require('./Routes/AddTask');
const TaskGroup = require('./Routes/Tasks');
const TGroupR = require('./Routes/TGroupR');
const ForgetPassword = require('./Routes/Forgotpassword');
const ResetPassword = require('./Routes/Resetpassword');

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://Promise:Promise@cluster0.iufeasi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Database connected successfully"))
.catch(err => console.error("Database connection error", err));

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Use cors middleware to enable CORS
app.use(cors());

// Routes
app.use('/api', UserR);
app.use('/api', Signinroutes);
app.use('/api', AddTask);
app.use('/api', TaskGroup);
app.use('/api', TGroupR);
app.use('/api', ForgetPassword);
app.use('/api', ResetPassword);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
