const express = require('express');
const router = express.Router();
const Task = require('../model/Task'); 
const authMiddleware = require('../middleware/auth'); 

// Create a new task (POST /tasks)
router.post('/tasks', authMiddleware, async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  const userId = req.user.userId; // Extracted from the authMiddleware

  try {
    const task = await Task.create({ title, description, status, priority, dueDate, userId });
    // await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Get all tasks for a user (GET /tasks)
router.get('/tasks', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 }); // Sorted by latest first
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Update a task (PUT /tasks/:id)
router.put('/tasks/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;
  const userId = req.user.userId;

  try {
    const task = await Task.findOneAndUpdate({ _id: id, userId }, { title, description, status, priority, dueDate }, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete a task (DELETE /tasks/:id)
router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
    console.log(id +" "+ userId)
  try {
    const task = await Task.findOneAndDelete({_id:id,userId});
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
