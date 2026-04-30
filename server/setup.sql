-- CMDI Grade Portal Database Setup
-- Run this in MySQL (phpMyAdmin or command line)

CREATE DATABASE IF NOT EXISTS cmdi_portal;
USE cmdi_portal;

-- Users table (all roles)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'teacher', 'admin', 'registrar', 'finance') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  course VARCHAR(100),
  year_level INT,
  gpa DECIMAL(3,2) DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  units INT NOT NULL,
  schedule VARCHAR(50),
  instructor_id VARCHAR(50),
  capacity INT DEFAULT 40,
  FOREIGN KEY (instructor_id) REFERENCES users(user_id)
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  course_id INT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  course_id INT NOT NULL,
  midterm DECIMAL(5,2),
  finals DECIMAL(5,2),
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  due_date DATE,
  status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
  FOREIGN KEY (student_id) REFERENCES users(user_id)
);

-- Insert demo users (password: demo123)
INSERT IGNORE INTO users (user_id, name, email, password, role) VALUES
('STU-001', 'Juan Dela Cruz', 'juan@cmdi.edu', '$2a$10$demo123', 'student'),
('TCH-001', 'Maria Santos', 'maria@cmdi.edu', '$2a$10$demo123', 'teacher'),
('ADM-001', 'Admin User', 'admin@cmdi.edu', '$2a$10$demo123', 'admin'),
('REG-001', 'Registrar User', 'registrar@cmdi.edu', '$2a$10$demo123', 'registrar'),
('FIN-001', 'Finance User', 'finance@cmdi.edu', '$2a$10$demo123', 'finance');

-- Insert demo courses
INSERT IGNORE INTO courses (course_code, title, units, schedule, instructor_id, capacity) VALUES
('CS101', 'Introduction to Programming', 3, 'MWF 9:00-10:00', 'TCH-001', 40),
('CS201', 'Data Structures', 4, 'TTH 10:00-12:00', 'TCH-001', 35),
('MATH201', 'Calculus II', 4, 'MWF 11:00-12:00', 'TCH-001', 45),
('ENG101', 'Technical Writing', 3, 'MWF 1:00-2:00', 'TCH-001', 40);

-- Insert demo enrollments
INSERT IGNORE INTO enrollments (student_id, course_id, status) VALUES
('STU-001', 1, 'approved'),
('STU-001', 2, 'approved'),
('STU-001', 3, 'pending');

-- Insert demo grades
INSERT IGNORE INTO grades (student_id, course_id, midterm, finals) VALUES
('STU-001', 1, 88, 92),
('STU-001', 2, 85, 88);

-- Insert demo payments
INSERT IGNORE INTO payments (student_id, total_amount, paid_amount, due_date, status) VALUES
('STU-001', 30000, 30000, '2024-01-15', 'paid'),
('STU-001', 15000, 0, '2024-02-15', 'pending');
