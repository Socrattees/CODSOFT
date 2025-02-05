import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Create new project
router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const project = await newProject.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update project
router.put("/update/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, { new: true });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;