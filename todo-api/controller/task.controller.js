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

// Create ---------------------------------------------
const createTask = async (req, res) => {
  const { title } = req.body;
  await sql`insert into tasks(id, title) values(${Date.now()}, ${title})`;
  res.json([{ status: "Created" }]);
};

// Read ---------------------------------------------
const getTask = async (req, res) => {
  const result = await sql`select * from tasks`;
  res.json(result);
};

// Update ---------------------------------------------
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  await sql`update tasks set title = ${title} where id = ${id}`;
  res.json([{ status: "Updated" }]);
};

// Delete ---------------------------------------------
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await sql`delete from tasks where id = ${id}`;
  res.json([{ status: "Deleted" }]);
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
