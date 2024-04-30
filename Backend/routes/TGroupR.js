const express = require("express");
const TGroupSchema = require("../config/TGroupSchema");
const Task = require("../config/TaskSchema");
const LevelsRoutes = require("./RoleLevels");
const bodyParser = require('body-parser');

const app = express.Router();
const customBodyParserMiddleware = bodyParser.json({ limit: '100mb' });

app.post('/TGroups', customBodyParserMiddleware, async (req, res) => {
  try {
    let { groupName, deptHead, projectLead, members, profilePic } = req.body;

    // Example transformation: take the first element if array, else use as is
    deptHead = Array.isArray(deptHead) && deptHead.length > 0 ? deptHead[0] : deptHead;
    projectLead = Array.isArray(projectLead) && projectLead.length > 0 ? projectLead[0] : projectLead;

    const newTaskGroup = new TGroupSchema({
      groupName,     
      deptHead,
      projectLead,
      members,
      profilePic,
      createdAt: new Date(),
    });

    const savedTaskGroup = await newTaskGroup.save();
    const allTaskGroups = await TGroupSchema.find();
    res.status(201).json({ savedTaskGroup, allTaskGroups });
  } catch (error) {
    console.error("Error adding newGroup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// app.get("/TGroups", async (req, res) => {
//   try {
//     const taskGroups = await TGroupSchema.find().sort({ createdAt: -1 });

//     res.json(taskGroups);
//     // console.log("data", taskGroups);
//   } catch (error) {
//     console.error("Error fetching task groups:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.get("/tgroups", async (req, res) => {
  // console.log("mem");
  try {
    const taskGroups = await TGroupSchema.find().sort({ createdAt: -1 });

    res.json(taskGroups);
  } catch (error) {
    console.error("Error fetching task groups:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;

// app.get("/TGroups", async (req, res) => {
//   // console.log(req)
//   try {
//     const taskGroups = await TGroupSchema.find().sort({ createdAt: -1 });
//     // console.log(res)

//     res.json(taskGroups);
//   } catch (error) {
//     console.error("Error fetching task groups:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//getting tasks using task group id

app.get("/tasks/:taskGroupId", async (req, res) => {
  try {
    const taskGroupId = req.params.taskGroupId;

    // Find the TaskGroup by ID
    const taskGroup = await TGroupSchema.findById(taskGroupId);
    // console.log(taskGroup, "get");

    if (!taskGroup) {
      return res.status(404).json({ message: "TaskGroup not found" });
    }

    // Find all tasks with the specified taskGroupId
    const tasks = await Task.find({ "taskGroup.id": taskGroupId });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/TGroup/:TGroupId", async (req, res) => {
  const TGroupId = req.params.TGroupId;

  const { groupName, members, profilePic, deptHead, projectLead, } = req.body;

  try {
    // Retrieve the existing task group
    const existingTGroup = await TGroupSchema.findById(TGroupId);

    if (!existingTGroup) {
      return res.status(404).json({ message: "TGroup not found" });
    }

    // Merge the existing members with the new members from the request body
    const updatedeptHeads = existingTGroup.deptHead.concat(deptHead || [])
    const updateprojectLeads = existingTGroup.projectLead.concat(projectLead || [])
    const updatedMembers = existingTGroup.members.concat(members || []);

    // Update the task group with the new data
    const updatedTGroup = await TGroupSchema.findByIdAndUpdate(
      TGroupId,
      { groupName, members: updatedMembers, profilePic, projectLead: updateprojectLeads, deptHead: updatedeptHeads },
      { new: true }
    );
    
    

    res.json(updatedTGroup);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/members/:TGroupId", async (req, res) => {
  const TGroupId = req.params.TGroupId;

  try {
    // Use populate to get members based on TGroupId
    const tgroup = await TGroupSchema.findOne({ _id: TGroupId }).populate({
      path: "members deptHead projectLead"
  });

    if (!tgroup) {
      return res
        .status(404)
        .json({ message: "TGroup not found for the specified TGroupId" });
    }

    const members = tgroup.members;
    const deptHead = tgroup.deptHead;
    const projectLead = tgroup.projectLead;

    res.json({members, deptHead, projectLead});
    // console.log(members,"members");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/delete/:TGroupId", LevelsRoutes, async (req, res) => {
  // console.log("del");
  const TGroupId = req.params.TGroupId;

  try {
    // Use Mongoose's findOneAndDelete to find and delete the document by ID
    const deletedTask = await TGroupSchema.findOneAndDelete({ _id: TGroupId });

    if (deletedTask) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = app;
