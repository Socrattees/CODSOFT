import express from 'express';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Log from '../models/Log.js';

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { newTask, senderId } = req.body;

    const task = new Task(newTask);
    await task.save();

    // Update User and Project with the new task
    await User.findByIdAndUpdate(newTask.user, { $push: { tasks: task._id } });
    await Project.findByIdAndUpdate(newTask.project, { $push: { tasks: task._id } });

    const logEntry = {
      entityId: task._id,
      entityType: 'Task',
      title: task.title,
      action: 'create',
      changes: null, // No changes to log for a new task
      user: senderId,
      timestamp: new Date()
    };
    await Log.create(logEntry);

    res.status(201).send({ message: 'Task created successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).send({ message: 'An error occurred while creating the task.', error: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ project: 1, createdAt: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(400).json({ message: 'An error occurred while getting tasks.', error: error.message });
  }
});

// Get task by id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(400).json({ message: 'An error occurred while getting the task.', error: error.message });
  }
});

// Update task
router.put('/update/:id', async (req, res) => {
  try {
    const { updatedTask, senderId } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Save the original task data
    const originalTask = task.toObject();

    // Update the task with new data
    Object.assign(task, updatedTask);
    await task.save();

    // Update User and Project if they have changed
    if (updatedTask.assignee && updatedTask.assignee !== originalTask.assignee) {
      await User.findByIdAndUpdate(originalTask.assignee, { $pull: { tasks: task._id } });
      await User.findByIdAndUpdate(updatedTask.assignee, { $push: { tasks: task._id } });
    }
    if (updatedTask.project && updatedTask.project !== originalTask.project) {
      await Project.findByIdAndUpdate(originalTask.project, { $pull: { tasks: task._id } });
      await Project.findByIdAndUpdate(updatedTask.project, { $push: { tasks: task._id } });
    }

    // Prepare changes for logging
    const changes = {};
    for (const key in updatedTask) {
      const originalValue = originalTask[key];
      const newValue = updatedTask[key];

      if (JSON.stringify(originalValue) !== JSON.stringify(newValue)) {
        changes[key] = {
          oldValue: JSON.stringify(originalValue),
          newValue: JSON.stringify(newValue)
        };
      }
    }

    const logEntry = {
      entityId: task._id,
      entityType: 'Task',
      title: task.title,
      action: 'update',
      changes: changes,
      user: senderId,
      timestamp: new Date()
    };
    await Log.create(logEntry);

    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ message: 'An error occurred while updating the task.', error: error.message });
  }
});

// Delete task
router.delete('/delete/:id', async (req, res) => {
  try {
    const { senderId } = req.body;

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update User and Project to remove the deleted task
    await User.findByIdAndUpdate(task.user, { $pull: { tasks: task._id } });
    await Project.findByIdAndUpdate(task.project, { $pull: { tasks: task._id } });

    const logEntry = {
      entityId: task._id,
      entityType: 'Task',
      title: task.title,
      action: 'delete',
      changes: null, // No changes to log for a deleted task
      user: senderId,
      timestamp: new Date()
    };
    await Log.create(logEntry);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'An error occurred while deleting the task.', error: error.message });
  }
});

export default router;