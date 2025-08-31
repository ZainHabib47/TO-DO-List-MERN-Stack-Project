var express = require('express');
var router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);   // return JSON
  } catch (err) {
    next(err);
  }
});

// Add a new task
router.post('/addtask', async (req, res, next) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title });
    res.status(201).json(task);   // return new task
  } catch (err) {
    next(err);
  }
});

// Mark task as completed
router.put('/:id/complete', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
