const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'cmdi_app',
  password: process.env.DB_PASSWORD || 'cmdi_app_password',
  database: process.env.DB_NAME || 'cmdi_portal',
};

async function populateData() {
  try {
    const connection = await mysql.createConnection(config);
    console.log('Connected to database for data population');

    // Load demo data
    const dataPath = path.join(__dirname, 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Clear existing data (optional, for clean setup)
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE payments');
    await connection.query('TRUNCATE TABLE grades');
    await connection.query('TRUNCATE TABLE enrollments');
    await connection.query('TRUNCATE TABLE courses');
    await connection.query('TRUNCATE TABLE students');
    await connection.query('TRUNCATE TABLE teachers');
    await connection.query('TRUNCATE TABLE users');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Insert users
    for (const user of data.users) {
      await connection.query(
        'INSERT INTO users (user_id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
        [user.user_id, user.name, user.email, user.password, user.role]
      );
    }
    console.log(`Inserted ${data.users.length} users`);

    // Insert students
    for (const student of data.students) {
      await connection.query(
        'INSERT INTO students (user_id, course, year_level, gpa) VALUES (?, ?, ?, ?)',
        [student.user_id, student.course, student.year_level, student.gpa]
      );
    }
    console.log(`Inserted ${data.students.length} students`);

    // Insert teachers
    for (const teacher of data.teachers) {
      await connection.query(
        'INSERT INTO teachers (user_id, department) VALUES (?, ?)',
        [teacher.user_id, teacher.department]
      );
    }
    console.log(`Inserted ${data.teachers.length} teachers`);

    // Insert courses
    for (const course of data.courses) {
      await connection.query(
        'INSERT INTO courses (course_code, course_name, units, schedule, instructor_id, capacity) VALUES (?, ?, ?, ?, ?, ?)',
        [course.course_code, course.title, course.units, course.schedule, course.instructor_id, course.capacity]
      );
    }
    console.log(`Inserted ${data.courses.length} courses`);

    // Insert enrollments
    for (const enrollment of data.enrollments) {
      await connection.query(
        'INSERT INTO enrollments (student_id, course_id, status, enrolled_at) VALUES (?, ?, ?, ?)',
        [enrollment.student_id, enrollment.course_id, enrollment.status, enrollment.enrolled_at]
      );
    }
    console.log(`Inserted ${data.enrollments.length} enrollments`);

    // Insert grades
    for (const grade of data.grades) {
      await connection.query(
        'INSERT INTO grades (student_id, course_id, midterm, finals) VALUES (?, ?, ?, ?)',
        [grade.student_id, grade.course_id, grade.midterm, grade.finals]
      );
    }
    console.log(`Inserted ${data.grades.length} grades`);

    // Insert payments
    for (const payment of data.payments) {
      await connection.query(
        'INSERT INTO payments (student_id, total_amount, paid_amount, due_date, status) VALUES (?, ?, ?, ?, ?)',
        [payment.student_id, payment.total_amount, payment.paid_amount, payment.due_date, payment.status]
      );
    }
    console.log(`Inserted ${data.payments.length} payments`);

    await connection.end();
    console.log('Demo data populated successfully!');
  } catch (error) {
    console.error('Failed to populate demo data:', error.message);
    process.exit(1);
  }
}

populateData();