const express = require("express");
const Task = require("../config/TaskSchema");
const app = express.Router();

app.get("/tasks", async (req, res) => {
  try {
    const taskGroups = await Task.find().sort({ createdAt: -1 });
    res.json(taskGroups);
  } catch (error) {
    console.error("Error fetching task groups:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.put("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    const taskGroups = await Task.find().sort({ createdAt: -1 });
    res.json(taskGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/countCompletedTasks/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log(userId, "userid");

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }



    const completedCountQuery = {
      people: { $elemMatch: { userId: userId } },
      status: "Completed",
    };

    const totalCountQuery = {
      people: { $elemMatch: { userId: userId } },
    };

    // Count tasks where status is 'Completed' for the given userId within the people array
    const completedCount = await Task.countDocuments(completedCountQuery);

    // Count total tasks for the given userId within the people array
    const totalCount = await Task.countDocuments(totalCountQuery);

    // Return both counts in the response
    res.json({ completedCount, totalCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching counts", error: error.message });
  }
});

app.get("/countTasksByGroup/:taskGroupName", async (req, res) => {
  try {
    // Get the task group name from path parameters
    const { taskGroupName } = req.params;

    // Count tasks where status is 'Completed' and belongs to the specific task group
    const completedCount = await Task.countDocuments({
      taskGroup: taskGroupName,
      status: "Completed",
    });

    // Count total tasks in the specific task group
    const totalCount = await Task.countDocuments({
      taskGroup: taskGroupName,
    });

    // Return both counts in the response
    res.json({ completedCount, totalCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching counts", error: error.message });
  }
});

app.put("/category/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { categoryAction, remark } = req.body;

    let status;
    let category;
    if (categoryAction === "Approved") {
      status = "Completed";
      category = "Approved";
    } else if (categoryAction === "Unapproved") {
      status = "In Progress";
      category = "Unapproved";
    } else {
      return res.status(400).json({ message: "Invalid category action" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { category, status, remark } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = app;
