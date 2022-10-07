const pool = require("./db-connect");

async function registerTask(task) {
  const text = `
    INSERT INTO task (title, description, assignee, priority, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;
  const values = [
    task.title,
    task.description,
    task.assignee,
    task.priority,
    task.userId,
  ];
  return pool.query(text, values);
}

async function getTasks(userId) {
  const text = `SELECT * FROM task WHERE user_id = $1`;
  const values = [userId];
  return pool.query(text, values);
}

async function getTask(taskId, userId) {
  const text = `SELECT * FROM task WHERE id = $1 and  user_id = $2`;
  const values = [taskId, userId];
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
