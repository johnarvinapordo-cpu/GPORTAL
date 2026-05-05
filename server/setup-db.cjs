const mysql = require("mysql2/promise");
require("dotenv").config(); // ✅ FIX: proper env loading

const config = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.ROOT_DB_USER || "root",
  password: process.env.ROOT_DB_PASSWORD || "",
  database: process.env.DB_NAME || "cmdi_portal",
  appUser: process.env.DB_USER || "cmdi_app",
  appPassword: process.env.DB_PASSWORD || "cmdi_app_password",
};

async function run(connection, sql) {
  for (const statement of sql
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)) {
    await connection.query(statement);
  }
}

async function ensureColumn(connection, table, column, definition) {
  const [columns] = await connection.query(
    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?",
    [config.database, table, column]
  );

  if (!columns.length) {
    await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN ${definition}`);
  }
}

async function ensureIndex(connection, table, indexName, sql) {
  const [indexes] = await connection.query(
    "SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND INDEX_NAME = ?",
    [config.database, table, indexName]
  );

  if (!indexes.length) {
    await connection.query(sql);
  }
}

async function setup() {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      multipleStatements: false,
    });

    console.log(`Connected to MySQL at ${config.host}:${config.port}`);

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
    await connection.query(`USE \`${config.database}\``);

    await run(connection, `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'teacher', 'admin', 'registrar', 'finance') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE NOT NULL,
        course VARCHAR(100),
        year_level VARCHAR(30),
        gpa DECIMAL(3,2) DEFAULT 0.00,
        status VARCHAR(30) DEFAULT 'Active',
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS teachers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE NOT NULL,
        department VARCHAR(100),
        status VARCHAR(30) DEFAULT 'Active',
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_code VARCHAR(20) UNIQUE NOT NULL,
        title VARCHAR(120) NOT NULL,
        department VARCHAR(100),
        units INT NOT NULL,
        section VARCHAR(20) DEFAULT 'A',
        schedule VARCHAR(80),
        room VARCHAR(80),
        instructor_id VARCHAR(50),
        capacity INT DEFAULT 40,
        semester VARCHAR(30) DEFAULT '2nd',
        FOREIGN KEY (instructor_id) REFERENCES users(user_id)
      );

      CREATE TABLE IF NOT EXISTS enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) NOT NULL,
        course_id INT NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_enrollment (student_id, course_id),
        FOREIGN KEY (student_id) REFERENCES users(user_id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );

      CREATE TABLE IF NOT EXISTS grades (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) NOT NULL,
        course_id INT NOT NULL,
        midterm DECIMAL(5,2),
        finals DECIMAL(5,2),
        UNIQUE KEY unique_grade (student_id, course_id),
        FOREIGN KEY (student_id) REFERENCES users(user_id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );

      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id VARCHAR(50) NOT NULL,
        payment_ref VARCHAR(50),
        total_amount DECIMAL(10,2) NOT NULL,
        paid_amount DECIMAL(10,2) DEFAULT 0,
        method VARCHAR(50),
        due_date DATE,
        status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(user_id)
      );
    `);

    console.log("Database schema ready.");

    await connection.end();
  } catch (error) {
    console.error("Database setup failed:");
    console.error(error.message);
    process.exit(1);
  }
}

setup();