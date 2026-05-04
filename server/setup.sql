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

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(50) NOT NULL,
  assignment_id INT NOT NULL,
  content TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'submitted', 'graded') DEFAULT 'submitted',
  grade DECIMAL(5,2),
  feedback TEXT,
  FOREIGN KEY (student_id) REFERENCES users(user_id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50),
  type ENUM('enrollment', 'grade', 'billing', 'evaluation', 'submission', 'system') NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
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

-- Insert demo assignments
INSERT IGNORE INTO assignments (course_id, title, description, due_date) VALUES
(1, 'Programming Assignment 1', 'Create a simple calculator program', '2024-05-15'),
(1, 'Programming Assignment 2', 'Implement a linked list data structure', '2024-05-22'),
(2, 'Calculus Problem Set', 'Solve calculus problems 1-20', '2024-05-18'),
(3, 'Essay Submission', 'Write an essay on technical writing', '2024-05-25');

-- Insert demo submissions
INSERT IGNORE INTO submissions (student_id, assignment_id, content, submitted_at, status, grade, feedback) VALUES
('STU-001', 1, 'Calculator program code...', '2024-05-14', 'graded', 95, 'Excellent work. Shows good understanding of concepts.'),
('STU-001', 3, 'Problem set solutions...', '2024-05-18', 'submitted', NULL, NULL);

-- Insert demo notifications
INSERT IGNORE INTO notifications (user_id, type, title, message, read, created_at) VALUES
('STU-001', 'enrollment', 'Enrollment Approved', 'Your enrollment in CS101 has been approved. You can now access the course materials.', 0, NOW() - INTERVAL 2 HOUR),
('STU-001', 'grade', 'Grades Posted', 'Your midterm grades for MATH201 have been posted. Check your dashboard for details.', 0, NOW() - INTERVAL 24 HOUR),
('STU-001', 'billing', 'Payment Due', 'Your tuition payment of ₱25,000 is due on May 31, 2024. Please pay online or at the cashier.', 1, NOW() - INTERVAL 3 DAY),
('STU-001', 'submission', 'Assignment Submitted', 'Your assignment submission has been received', 1, NOW() - INTERVAL 5 DAY),
('STU-001', 'system', 'System Maintenance', 'The portal will be under maintenance on June 1, 2024 from 2:00 AM to 4:00 AM.', 1, NOW() - INTERVAL 7 DAY);
