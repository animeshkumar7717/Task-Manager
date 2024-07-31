const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskName: String,
  isDone: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = mongoose.model("todos", TaskSchema);

module.exports = TaskModel;
