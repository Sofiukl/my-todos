const pool = require("./db-connect");

async function registerTask(task) {
  const text = `
    INSERT INTO task (title, description, assignee, priority)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  const values = [task.title, task.description, task.assignee, task.priority];
  return pool.query(text, values);
}

async function getTasks() {
  const text = `SELECT * FROM task`;
  return pool.query(text);
}

async function getTask(taskId) {
  const text = `SELECT * FROM task WHERE id = $1`;
  const values = [taskId];
  return pool.query(text, values);
}

async function updateTaskName(taskId, title) {
  const text = `UPDATE task SET title = $2 WHERE id = $1`;
  const values = [taskId, title];
  return pool.query(text, values);
}

async function removeTask(taskId) {
  const text = `DELETE FROM task WHERE id = $1`;
  const values = [taskId];
  return pool.query(text, values);
}

module.exports = {
  registerTask,
  getTasks,
  getTask,
  updateTaskName,
  registerTask,
};
