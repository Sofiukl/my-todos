const express = require("express");
const { registerTask, getTasks } = require("./db");

const app = express();
app.use(express.json());

const port = 5000;

app.get("/", (req, res) => {
  res.send("my-todo server is healthy!");
});

app.post("/save", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const assignee = req.body.assignee;
  const priority = req.body.priority;

  const registerTaskResult = await registerTask({
    title,
    description,
    assignee,
    priority,
  });
  const taskId = registerTaskResult.rows[0]["id"];
  console.log("Registered a task with id: " + taskId);

  res.json({ task_id: taskId });
});

app.get("/list", async (req, res) => {
  const tasksResult = await getTasks();
  const tasks = tasksResult.rows;
  console.log(tasks);

  res.send(tasks);
});

app.listen(port, async () => {
  console.log(`Now listening on port ${port}`);
});
