const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  userid: { type: String},
  owner: {
    id: String, // Assuming you have an ownerId variable
    name: String
  },// Assuming 'owner' is a property in the notification
  taskId:{ type: String },
  created: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;