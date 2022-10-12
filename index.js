const express = require("express");
const { registerTask, getTasks } = require("./db");
require("dotenv").config();
const app = express();
app.use(express.json());

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

app.get("/", (req, res) => {
  res.send("my-todo server is healthy!");
});

app.post("/save", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const assignee = req.body.assignee;
  const priority = req.body.priority;
  const userId = req.body.userId; //TODO: Fetch from user principal after authentication implementation

  const registerTaskResult = await registerTask({
    title,
    description,
    assignee,
    priority,
    userId,
  });
  const taskId = registerTaskResult.rows[0]["id"];
  console.log("Registered a task with id: " + taskId);

  res.json({ task_id: taskId });
});

app.get("/list/:id", async (req, res) => {
  const tasksResult = await getTasks(req.params.id);
  let tasks = tasksResult.rows;
  tasks = tasks.map((task) => {
    const userId = task["user_id"];
    delete task["user_id"];
    return {
      ...task,
      userId,
    };
  });

  res.send(tasks);
});

app.listen(port, async () => {
  console.log(`Now listening on port ${port}`);
});
