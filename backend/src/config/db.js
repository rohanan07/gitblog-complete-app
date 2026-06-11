const { Pool } = require("pg");
require("dotenv").config();

const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);

const connectionString = `postgresql://${process.env.DB_USER}:${encodedPassword}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;