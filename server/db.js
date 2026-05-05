const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'cmdi_app',
  password: process.env.DB_PASSWORD || 'cmdi_app_password',
  database: process.env.DB_NAME || 'cmdi_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
