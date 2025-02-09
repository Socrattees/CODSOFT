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

    const logEntry = {
      entityId: task._id,
      entityType: 'Task',
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

export default router;