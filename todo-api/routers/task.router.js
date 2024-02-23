const express = require("express");

const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/task.controller");

const taskRouter = express.Router();

// Tasks
taskRouter.post("/create", createTask);
taskRouter.get("/", getTask);
taskRouter.put("/update/:id", updateTask);
taskRouter.delete("/delete/:id", deleteTask);

module.exports = taskRouter;
