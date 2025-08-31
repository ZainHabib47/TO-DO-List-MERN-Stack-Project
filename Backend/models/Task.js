const mongoose = require('mongoose');

// Define Task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Export Task model
module.exports = mongoose.model('Task', taskSchema);
