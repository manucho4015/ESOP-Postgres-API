const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.HEROKU_DB_USER,
  host: process.env.HEROKU_DB_HOST,
  database: process.env.HEROKU_DB_DATABASE,
  password: process.env.HEROKU_DB_PASSWORD,
  port: process.env.HEROKU_DB_PORT,
  connectionString: process.env.HEROKU_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
