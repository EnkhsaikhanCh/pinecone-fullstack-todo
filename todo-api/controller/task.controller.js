const fs = require("fs");
const postgres = require("postgres");
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const filePath = "tasks.json";

function readTasks() {
  // const data = fs.readFileSync(filePath, "utf8");
  const result = sql`select * from tasks`;
  const list = JSON.parse(result);
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
const getTask = async (req, res) => {
  const result = await sql`select * from tasks`;
  res.json(result);
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
