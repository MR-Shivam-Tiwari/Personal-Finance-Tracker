const mongoose = require("mongoose");

const taskGroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    // required: true,
    // trim: true,
  }, 
  deptHead:[{ userId: String, name: String }],
  projectLead:[{ userId: String, name: String }],
  members:[{ userId: String, name: String }],
  profilePic:{type:String},
 
  createdAt: Date,
});

const TGroupSchema = mongoose.model("TaskGroup", taskGroupSchema);

module.exports = TGroupSchema;
