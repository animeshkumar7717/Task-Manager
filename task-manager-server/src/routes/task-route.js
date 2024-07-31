const express = require("express");
const {
  getAllTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/task-controller");

const taskRouter = express.Router();

taskRouter.route("/").get(getAllTask).post(createTask);
taskRouter.route("/:id").put(updateTask).delete(deleteTask);

module.exports = taskRouter;
