const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({ tasks });
};

const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });
  if (!task) {
    throw new NotFoundError(`Item with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  if (task && task === "") {
    throw new BadRequestError("Please input value to be updated");
  }
  const updateTask = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateTask) {
    throw new NotFoundError(`Item with id ${id} not found`);
  }
  res.status(StatusCodes.OK).json({ updateTask });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete({ _id: id });
  if (!task) {
    throw new NotFoundError(`Item with id ${id} not found`);
  }
  res.status(StatusCodes.OK).send("Item deleted");
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask };
