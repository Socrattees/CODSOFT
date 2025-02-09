import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started"
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
