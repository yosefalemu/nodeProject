const Task = require("../models/tasks");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../error/custom-error");

//get all the tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
//create new task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
//get single task
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    return next(createCustomError(`There is no task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});
//update task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`There is no task with id ${taskId}`, 404));
  }
  res.status(200).json({ task });
});
//delete task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: taskId });
  if (!deletedTask) {
    return next(createCustomError(`There is no task with id ${taskId}`, 404));
  }
  res
    .status(200)
    .json({ message: `task deleted with id ${taskId}`, deletedTask });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
