const express = require("express");
var cors = require("cors");

const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

function readTasks() {
  const data = fs.readFileSync("tasks.json", "utf8");
  const list = JSON.parse(data);
  return list;
}

// Create ---------------------------------------------
app.post("/tasks/create", (req, res) => {
  const { title } = req.body;

  const list = readTasks();

  const taskID = Date.now();

  list.push({
    id: taskID,
    title: title,
  });

  fs.writeFileSync("tasks.json", JSON.stringify(list));
  res.json([{ status: "Created" }]);
});

// Read ---------------------------------------------
app.get("/tasks", (req, res) => {
  const data = fs.readFileSync("tasks.json", "utf8");
  res.json(JSON.parse(data));
});

// Update ---------------------------------------------
app.put("/tasks/update/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const list = readTasks();

  const index = list.findIndex((item) => item.id === Number(id));

  list[index].title = title;

  fs.writeFileSync("tasks.json", JSON.stringify(list));
  res.json([{ status: "Updated" }]);
});

// Delete ---------------------------------------------
app.delete("/tasks/delete/:id", (req, res) => {
  const { id } = req.params;

  const list = readTasks();

  const newList = list.filter((item) => item.id !== Number(id));

  fs.writeFileSync("tasks.json", JSON.stringify(newList));
  res.json([{ status: "Deleted" }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
