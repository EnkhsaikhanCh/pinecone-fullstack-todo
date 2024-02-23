const fs = require("fs");

const filePath = "tasks.json";

function readTasks() {
  const data = fs.readFileSync(filePath, "utf8");
  const list = JSON.parse(data);
  return list;
}

// Create ---------------------------------------------
const createTask = (req, res) => {
  const { title } = req.body;

  const list = readTasks();

  const taskID = Date.now();

  list.push({
    id: taskID,
    title: title,
  });

  fs.writeFileSync(filePath, JSON.stringify(list));
  res.json([{ status: "Created" }]);
};

// Read ---------------------------------------------
const getTask = (req, res) => {
  const data = fs.readFileSync(filePath, "utf8");
  res.json(JSON.parse(data));
};

// Update ---------------------------------------------
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const list = readTasks();

  const index = list.findIndex((item) => item.id === Number(id));

  list[index].title = title;

  fs.writeFileSync(filePath, JSON.stringify(list));
  res.json([{ status: "Updated" }]);
};

// Delete ---------------------------------------------
const deleteTask = (req, res) => {
  const { id } = req.params;

  const list = readTasks();

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync(filePath, JSON.stringify(newList));
  res.json([{ status: "Deleted" }]);
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
