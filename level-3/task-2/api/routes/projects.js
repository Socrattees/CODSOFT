import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

// Create new project
router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const project = await newProject.save();
    const manager = await User.findById(project.manager);
    manager.projects.push(project._id);
    await manager.save();
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

// Clear user from all projects and add user to new projects
router.put("/update-members/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldProjects = user.projects || [];
    const newProjects = req.body.projects || [];

    console.log("Old Projects:", oldProjects);
    console.log("New Projects:", newProjects);

    // Remove user from old projects
    const removeUserFromProjects = oldProjects.map(async (projectId) => {
      const project = await Project.findById(projectId);
      if (project) {
        console.log(`Removing user from project: ${project.name}`);
        console.log("Project members before removal:", project.members);
        project.members = project.members.filter((member) => member.toString() !== user._id.toString());
        console.log("Project members after removal:", project.members);
        await project.save();
      }
    });

    // Update user's projects in the user's document to ensure they are not in old projects anymore
    user.projects = newProjects;
    await user.save();

    // Add user to new projects
    const addUserToProjects = newProjects.map(async (projectId) => {
      const project = await Project.findById(projectId);
      if (project && !project.members.includes(user._id.toString())) {
        console.log(`Adding user to project: ${project.name}`);
        console.log("Project members before addition:", project.members);
        project.members.push(user._id);
        console.log("Project members after addition:", project.members);
        await project.save();
      }
    });

    // Wait for all promises to complete
    await Promise.all([...removeUserFromProjects, ...addUserToProjects]);

    res.status(200).json("User updated successfully");
  } catch (err) {
    console.error(err); // Log the error to the server console for debugging
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
});

export default router;