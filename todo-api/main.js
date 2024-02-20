const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

// Create
app.post("/articles/create", (req, res) => {
  const { title, desc } = req.body;

  const data = fs.readFileSync("articles.json", "utf8");
  const list = JSON.parse(data);

  const articleID = list.length + 1;

  list.push({
    id: articleID,
    title: title,
    desc: desc,
  });

  fs.writeFileSync("articles.json", JSON.stringify(list));
  res.json([{ status: "Created" }]);
});

// Read
app.get("/articles", (req, res) => {
  const data = fs.readFileSync("articles.json", "utf8");
  res.json(JSON.parse(data));
});

// Update
app.put("/articles/update/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  // fs.appendFile("articles.json", JSON.stringify(list));
  res.json([{ status: "Updated" }]);
});

// Delete
app.delete("/articles/delete", (req, res) => {
  res.json([{ status: "Deleted" }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
