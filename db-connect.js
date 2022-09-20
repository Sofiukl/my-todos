const { Pool } = require("pg");

const dbCred = {
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: 5433,
};

const pool = new Pool(dbCred);
module.exports = pool;
