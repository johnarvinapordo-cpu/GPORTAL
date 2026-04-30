const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cmdi_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const SECRET_KEY = 'cmdi_portal_secret_key';

// Helper function to execute queries
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const users = await query('SELECT * FROM users WHERE user_id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    const user = users[0];
    // For demo, accept 'demo123' or plain password check
    if (password === 'demo123' || user.password === password) {
      const token = jwt.sign({ user_id: user.user_id, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
      return res.json({
        token,
        user: {
          id: user.id,
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
    
    res.status(401).json({ error: 'Invalid password' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student dashboard data
app.get('/api/student/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get student info
    const students = await query('SELECT * FROM students WHERE user_id = ?', [userId]);
    const user = await query('SELECT * FROM users WHERE user_id = ?', [userId]);
    
    // Get enrolled courses
    const courses = await query(`
      SELECT c.*, e.status as enrollment_status
      FROM courses c
      JOIN enrollments e ON c.id = e.course_id
      WHERE e.student_id = ? AND e.status = 'approved'
    `, [userId]);
    
    // Get grades
    const grades = await query(`
      SELECT c.course_code, g.midterm, g.finals
      FROM grades g
      JOIN courses c ON g.course_id = c.id
      WHERE g.student_id = ?
    `, [userId]);
    
    // Get payments
    const payments = await query('SELECT * FROM payments WHERE student_id = ?', [userId]);
    
    res.json({
      student: students[0] || {},
      user: user[0] || {},
      courses,
      grades,
      payments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get teacher dashboard data
app.get('/api/teacher/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get courses taught by teacher
    const courses = await query('SELECT * FROM courses WHERE instructor_id = ?', [userId]);
    
    // Get pending grades
    const grades = await query(`
      SELECT g.*, u.name as student_name, c.course_code
      FROM grades g
      JOIN users u ON g.student_id = u.user_id
      JOIN courses c ON g.course_id = c.id
      WHERE c.instructor_id = ?
    `, [userId]);
    
    res.json({ courses, grades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get admin dashboard data
app.get('/api/admin', async (req, res) => {
  try {
    const stats = {
      totalStudents: (await query('SELECT COUNT(*) as count FROM users WHERE role = "student"'))[0].count,
      totalTeachers: (await query('SELECT COUNT(*) as count FROM users WHERE role = "teacher"'))[0].count,
      totalCourses: (await query('SELECT COUNT(*) as count FROM courses'))[0].count,
      activeEnrollments: (await query('SELECT COUNT(*) as count FROM enrollments WHERE status = "approved"'))[0].count,
    };
    
    const recentActivity = await query('SELECT * FROM enrollments ORDER BY enrolled_at DESC LIMIT 5');
    
    res.json({ stats, recentActivity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get registrar dashboard data
app.get('/api/registrar', async (req, res) => {
  try {
    const pendingEnrollments = await query("SELECT * FROM enrollments WHERE status = 'pending'");
    const courses = await query('SELECT * FROM courses');
    
    res.json({ pendingEnrollments, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get finance dashboard data
app.get('/api/finance', async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        SUM(total_amount) as total_expected,
        SUM(paid_amount) as total_collected,
        SUM(total_amount - paid_amount) as total_balance,
        COUNT(CASE WHEN status != 'paid' THEN 1 END) as pending_count
      FROM payments
    `);
    
    const payments = await query('SELECT * FROM payments LIMIT 10');
    
    res.json({ stats: stats[0], payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enroll in course
app.post('/api/enroll', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    await query('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [studentId, courseId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update grade
app.post('/api/grade', async (req, res) => {
  try {
    const { studentId, courseId, midterm, finals } = req.body;
    const existing = await query('SELECT * FROM grades WHERE student_id = ? AND course_id = ?', [studentId, courseId]);
    
    if (existing.length > 0) {
      await query('UPDATE grades SET midterm = ?, finals = ? WHERE student_id = ? AND course_id = ?', 
        [midterm, finals, studentId, courseId]);
    } else {
      await query('INSERT INTO grades (student_id, course_id, midterm, finals) VALUES (?, ?, ?, ?)',
        [studentId, courseId, midterm, finals]);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update payment
app.post('/api/payment', async (req, res) => {
  try {
    const { studentId, amount } = req.body;
    await query('UPDATE payments SET paid_amount = paid_amount + ? WHERE student_id = ?', [amount, studentId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve enrollment
app.post('/api/approve-enrollment', async (req, res) => {
  try {
    const { enrollmentId } = req.body;
    await query("UPDATE enrollments SET status = 'approved' WHERE id = ?", [enrollmentId]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
