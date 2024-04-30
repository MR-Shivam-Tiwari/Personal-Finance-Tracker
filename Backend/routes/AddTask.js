const express = require("express");
const Task = require("../modules/TaskSchema");
const Notification = require("../modules/Notification");
const UserSchema = require("../modules/UserSchema");
const multer = require('multer');
const app = express.Router();
const { Expo } = require("expo-server-sdk");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const expo = new Expo();
app.use(cors());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory for file uploads
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Ensure 'uploads' directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.post("/tasks", upload.single('pdfFile'), async (req, res) => {
  console.log('reqst file', req.file)
  try {
    const {
      owner,
      taskGroup,
      taskName,
      description,
      audioFile,
      people,
      startDate,
      endDate,
      reminder,
    } = req.body;
    // console.log(req.file,"data")
    const ownerId = owner.id; // Extracting owner id
    const ownerName = owner.name;
    const pdfFilePath = req.file ? req.file.path : null;
    // const audio = req.file ? req.file.path : null;
    const newTask = new Task({
      owner, // Assigning owner id as a string
      taskGroup,
      taskName,
      description,
      audioFile,
      pdfFile: pdfFilePath,
      people,
      startDate,
      endDate,
      reminder,
      createdAt: new Date(),
    });

    // Use the asynchronous function to add the taskz
    let taskNew = await newTask.save();
    // console.log("task",taskNew);
    const taskId = taskNew._id;

    for (const assignedUser of people) {
      const { userId, name } = assignedUser;

      const newNotification = new Notification({
        title: `${ownerName} assigning task to you`,
        description: `New task: ${taskName}`,
        status: "pending",
        userid: userId, // Assign user id to userid
        owner: {
          id: ownerId, // Correctly assign ownerId to id
          name: ownerName, // Correctly assign ownerName to name
        },
        taskId: taskId,
        created: new Date(),
      });
      await newNotification.save();
    }

    const allTasks = await Task.find();
    res.status(201).json({ newTask });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/notifications/reply", async (req, res) => {
  try {
    const { userId, taskId, status, comment } = req.body;

    // Retrieve the task information to get ownerName and taskName
    const user = await UserSchema.findById(userId);

    // Fetch task information
    const task = await Task.findById(taskId);
    const taskName = task.taskName;
    const ownerId = task.owner.id;

    // Construct description with optional comment
    let description = `Task: ${taskName}`;
    if (comment) {
      description += `\nComment: ${comment}`; // Append comment to the description
    }

    let title;
    // console.log(status,"status")
    switch (status) {
      case "Accepted":
        title = `${user.name} accepted the task`;
        break;
      case "Rejected":
        title = `${user.name} rejected the task`;
        break;
      case "Accepted & Modified":
        title = `${user.name} accepted and  modified the task`;
        break;
      default:
        title = `${user.name} responded to the task`; // Default title
    }


    const newNotification = new Notification({
      title: title,
      description: description, // Use constructed description including the comment
      status: status,
      userid: ownerId, // Send the notification to the task owner
      owner: user.name,
      taskId: taskId,
      created: new Date(),
    });

    await newNotification.save();
    // console.log(newNotification,"noti")

    res.status(201).json({ message: "Reply sent successfully", comment: comment }); // Include comment in response
  } catch (error) {
    console.error("Error replying to task notification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/notifications/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Use the 'find' method to get notifications for a particular user
    const userNotifications = await Notification.find({ userid: userId });

    // Send the retrieved notifications as a JSON response
    res.json(userNotifications);
    // console.log(userNotifications,"user")
  } catch (error) {
    console.error("Error retrieving user notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/tasks/update/:taskId', async (req, res) => {
  
  try {
    const { taskId } = req.params;
    const updates = req.body; // Contains task updates and optionally comments

    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.status(200).send(task);
  //  console.log(task,'updatetsak') 
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.put('/notifications/:taskid', async (req, res) => {
  const { id } = req.params; // Get the ID of the notification to update
  const { title, description, status, owner, taskId } = req.body; // Extract updated fields from request body

  try {
    // Find the notification by ID and update it
    const notification = await Notification.findByIdAndUpdate(id, {
      $set: {
        title,
        description,
        status,
        owner,
        taskId
      }
    }, { new: true });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification); // Return the updated notification
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// app.put('/updatetasks/:id', async (req, res) => {
//   const { id } = req.params;
//   const { startDate, endDate, reminder, comment } = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(id, {
//       $set: {
//         startDate,
//         endDate,
//         reminder,
//         comment
//       }
//     }, { new: true }); // { new: true } option returns the document after update

//     if (!updatedTask) {
//       return res.status(404).send('Task not found');
//     }

//     res.send(updatedTask);
//   } catch (error) {
//     res.status(400).send('Error updating task: ' + error.message);
//   }
// });

module.exports = app;
