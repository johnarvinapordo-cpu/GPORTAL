const mysql = require('mysql2/promise');

async function setup() {
  // First connect without database to create it - try XAMPP socket path
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    socketPath: 'C:/xampp/mysql/mysql.sock'
  });
  
  console.log('Connected to MySQL...');
  
  // Create database
  await connection.query('CREATE DATABASE IF NOT EXISTS cmdi_portal');
  console.log('Database created!');
  
  // Use the database
  await connection.query('USE cmdi_portal');
  
  // Create tables
  const tables = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255),
      role ENUM('student', 'teacher', 'admin', 'registrar', 'finance') NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(50) UNIQUE NOT NULL,
      course VARCHAR(100),
      year_level INT,
      gpa DECIMAL(3,2) DEFAULT 0.00
    );
    
    CREATE TABLE IF NOT EXISTS teachers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(50) UNIQUE NOT NULL,
      department VARCHAR(100)
    );
    
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      course_code VARCHAR(20) UNIQUE NOT NULL,
      title VARCHAR(100) NOT NULL,
      units INT NOT NULL,
      schedule VARCHAR(50),
      instructor_id VARCHAR(50),
      capacity INT DEFAULT 40
    );
    
    CREATE TABLE IF NOT EXISTS enrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id VARCHAR(50) NOT NULL,
      course_id INT NOT NULL,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS grades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id VARCHAR(50) NOT NULL,
      course_id INT NOT NULL,
      midterm DECIMAL(5,2),
      finals DECIMAL(5,2)
    );
    
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id VARCHAR(50) NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      paid_amount DECIMAL(10,2) DEFAULT 0,
      due_date DATE,
      status ENUM('pending', 'partial', 'paid') DEFAULT 'pending'
    );
  `;
  
  // Execute table creation
  const tableList = tables.split(';').filter(t => t.trim());
  for (const table of tableList) {
    if (table.trim()) {
      await connection.query(table);
    }
  }
  console.log('Tables created!');
  
  // Insert demo data
  await connection.query(`INSERT IGNORE INTO users (user_id, name, email, password, role) VALUES 
    ('STU-001', 'Juan Dela Cruz', 'juan@cmdi.edu', 'demo123', 'student'),
    ('TCH-001', 'Maria Santos', 'maria@cmdi.edu', 'demo123', 'teacher'),
    ('ADM-001', 'Admin User', 'admin@cmdi.edu', 'demo123', 'admin'),
    ('REG-001', 'Registrar User', 'registrar@cmdi.edu', 'demo123', 'registrar'),
    ('FIN-001', 'Finance User', 'finance@cmdi.edu', 'demo123', 'finance')`);
  
  await connection.query(`INSERT IGNORE INTO courses (course_code, title, units, schedule, capacity) VALUES 
    ('CS101', 'Introduction to Programming', 3, 'MWF 9:00-10:00', 40),
    ('CS201', 'Data Structures', 4, 'TTH 10:00-12:00', 35),
    ('MATH201', 'Calculus II', 4, 'MWF 11:00-12:00', 45),
    ('ENG101', 'Technical Writing', 3, 'MWF 1:00-2:00', 40)`);
  
  await connection.query(`INSERT IGNORE INTO enrollments (student_id, course_id, status) VALUES 
    ('STU-001', 1, 'approved'),
    ('STU-001', 2, 'approved')`);
  
  await connection.query(`INSERT IGNORE INTO grades (student_id, course_id, midterm, finals) VALUES 
    ('STU-001', 1, 88, 92),
    ('STU-001', 2, 85, 88)`);
  
  await connection.query(`INSERT IGNORE INTO payments (student_id, total_amount, paid_amount, status) VALUES 
    ('STU-001', 30000, 30000, 'paid'),
    ('STU-001', 15000, 0, 'pending')`);
  
  console.log('Demo data inserted!');
  console.log('Database setup complete!');
  
  await connection.end();
}

setup().catch(console.error);
