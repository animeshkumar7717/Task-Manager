const TaskModel = require("../model/task-model");

const getAllTask = async (req, res) => {
  try {
    const task = await TaskModel.find();
    return res.status(200).json({
      success: true,
      message: "successfully get the tasks",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const data = req.body;
    if (!data.taskName) {
      return res.status(401).json({
        success: false,
        message: "forbidden, all field is required!",
      });
    }
    const newTask = new TaskModel(data);
    await newTask.save();
    return res.status(201).json({
      success: true,
      message: "successfully, created the task!",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "forbidden, id is required!",
      });
    }
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "update the task",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "forbidden, id is required!",
      });
    }
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "task is deleted!",
      data: deletedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
};
