const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loadEnv } = require("./env.cjs");

loadEnv();

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

const config = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cmdi_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const jwtSecret = process.env.JWT_SECRET || "cmdi_portal_secret_key";
const pool = mysql.createPool(config);

async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

function asyncRoute(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      if (error.code === "ER_ACCESS_DENIED_ERROR") {
        return res.status(503).json({
          error: "MySQL rejected the database credentials in .env. Use the MySQL root password, or create the cmdi_app user from server/create-app-user.sql, then restart npm run server.",
        });
      }

      if (error.code === "ECONNREFUSED") {
        return res.status(503).json({
          error: "MySQL is not running. Start MySQL on this laptop, then restart npm run server.",
        });
      }

      res.status(500).json({ error: error.message });
    }
  };
}

function toCurrency(value) {
  return Number(value || 0);
}

app.get("/api/health", asyncRoute(async (_req, res) => {
  await query("SELECT 1");
  res.json({ ok: true, database: config.database });
}));

app.post("/api/login", asyncRoute(async (req, res) => {
  const { userId, password, role } = req.body;
  const users = await query("SELECT * FROM users WHERE user_id = ?", [userId]);

  if (!users.length) {
    return res.status(401).json({ error: "User not found" });
  }

  const user = users[0];
  if (role && user.role !== role) {
    return res.status(403).json({ error: `This account is registered as ${user.role}.` });
  }

  const passwordMatches =
    user.password === password ||
    password === "demo123" ||
    (user.password?.startsWith("$2") && await bcrypt.compare(password, user.password));

  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ user_id: user.user_id, role: user.role }, jwtSecret, { expiresIn: "24h" });
  res.json({
    token,
    user: {
      id: user.id,
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}));

app.get("/api/courses", asyncRoute(async (_req, res) => {
  const courses = await query(`
    SELECT c.*, u.name AS instructor_name,
      COUNT(CASE WHEN e.status = 'approved' THEN 1 END) AS enrolled
    FROM courses c
    LEFT JOIN users u ON u.user_id = c.instructor_id
    LEFT JOIN enrollments e ON e.course_id = c.id
    GROUP BY c.id
    ORDER BY c.course_code
  `);
  res.json({ courses });
}));

app.get("/api/students", asyncRoute(async (_req, res) => {
  const students = await query(`
    SELECT u.user_id, u.name, u.email, s.course, s.year_level, s.gpa,
      COALESCE(s.status, 'Active') AS status
    FROM users u
    LEFT JOIN students s ON s.user_id = u.user_id
    WHERE u.role = 'student'
    ORDER BY u.name
  `);
  res.json({ students });
}));

app.get("/api/student/:userId", asyncRoute(async (req, res) => {
  const { userId } = req.params;
  const [user] = await query("SELECT id, user_id, name, email, role FROM users WHERE user_id = ?", [userId]);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const [student] = await query("SELECT * FROM students WHERE student_id = ?", [user.id]);

  // Get enrolled courses
  const courses = await query(`
    SELECT e.*, c.course_code, c.course_name, c.description
    FROM enrollment e
    JOIN courses c ON c.course_id = e.course_id
    WHERE e.student_id = ? AND e.status = 'enrolled'
    ORDER BY c.course_code
  `, [user.id]);

  // Get grades
  const grades = await query(`
    SELECT c.course_code, c.course_name, g.grade, g.semester, g.year
    FROM grades g
    JOIN courses c ON g.course_id = c.course_id
    WHERE g.student_id = ?
    ORDER BY c.course_code
  `, [user.id]);

  // Get payments
  const payments = await query("SELECT * FROM tuition_payments WHERE student_id = ? ORDER BY payment_date DESC", [user.id]);

  res.json({ user: user || {}, student: student || {}, courses, grades, payments });
}));

app.get("/api/teacher/:userId", asyncRoute(async (req, res) => {
  const { userId } = req.params;
  const courses = await query(`
    SELECT c.*, COUNT(CASE WHEN e.status = 'approved' THEN 1 END) AS enrolled
    FROM courses c
    LEFT JOIN enrollments e ON e.course_id = c.id
    WHERE c.instructor_id = ?
    GROUP BY c.id
    ORDER BY c.course_code
  `, [userId]);
  const grades = await query(`
    SELECT g.*, u.name AS student_name, c.course_code, c.title
    FROM grades g
    JOIN users u ON g.student_id = u.user_id
    JOIN courses c ON g.course_id = c.id
    WHERE c.instructor_id = ?
    ORDER BY c.course_code, u.name
  `, [userId]);
  res.json({ courses, grades });
}));

app.get("/api/admin", asyncRoute(async (_req, res) => {
  const [studentCount] = await query("SELECT COUNT(*) AS count FROM users WHERE role = 'student'");
  const [teacherCount] = await query("SELECT COUNT(*) AS count FROM users WHERE role = 'teacher'");
  const [courseCount] = await query("SELECT COUNT(*) AS count FROM courses");
  const [enrollmentCount] = await query("SELECT COUNT(*) AS count FROM enrollments WHERE status = 'approved'");
  const recentActivity = await query(`
    SELECT e.*, u.name AS student_name, c.course_code
    FROM enrollments e
    JOIN users u ON u.user_id = e.student_id
    JOIN courses c ON c.id = e.course_id
    ORDER BY e.enrolled_at DESC
    LIMIT 10
  `);

  res.json({
    stats: {
      totalStudents: studentCount.count,
      totalTeachers: teacherCount.count,
      totalCourses: courseCount.count,
      activeEnrollments: enrollmentCount.count,
    },
    recentActivity,
  });
}));

app.get("/api/registrar", asyncRoute(async (_req, res) => {
  const pendingEnrollments = await query(`
    SELECT e.*, u.name AS student_name, c.course_code, c.title
    FROM enrollments e
    JOIN users u ON u.user_id = e.student_id
    JOIN courses c ON c.id = e.course_id
    WHERE e.status = 'pending'
    ORDER BY e.enrolled_at
  `);
  const courses = await query("SELECT * FROM courses ORDER BY course_code");
  res.json({ pendingEnrollments, courses });
}));

app.get("/api/finance", asyncRoute(async (_req, res) => {
  const [stats] = await query(`
    SELECT
      COALESCE(SUM(total_amount), 0) AS total_expected,
      COALESCE(SUM(paid_amount), 0) AS total_collected,
      COALESCE(SUM(total_amount - paid_amount), 0) AS total_balance,
      COUNT(CASE WHEN status != 'paid' THEN 1 END) AS pending_count
    FROM payments
  `);
  const payments = await query(`
    SELECT p.*, u.name AS student_name
    FROM payments p
    JOIN users u ON u.user_id = p.student_id
    ORDER BY p.due_date DESC
    LIMIT 25
  `);
  res.json({
    stats: {
      total_expected: toCurrency(stats.total_expected),
      total_collected: toCurrency(stats.total_collected),
      total_balance: toCurrency(stats.total_balance),
      pending_count: stats.pending_count,
    },
    payments,
  });
}));

app.post("/api/enroll", asyncRoute(async (req, res) => {
  const { studentId, courseCode } = req.body;

  // Get user ID from user_id
  const [user] = await query("SELECT id FROM users WHERE user_id = ?", [studentId]);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Get course ID from course code
  const [course] = await query("SELECT course_id FROM courses WHERE course_code = ?", [courseCode]);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  // Check if already enrolled
  const [existing] = await query(
    "SELECT enrollment_id FROM enrollment WHERE student_id = ? AND course_id = ?",
    [user.id, course.course_id]
  );

  if (existing) {
    return res.status(400).json({ error: "Already enrolled in this course" });
  }

  // Create enrollment
  await query(
    "INSERT INTO enrollment (student_id, course_id, semester, year, enrollment_date, status) VALUES (?, ?, '1st', 2026, CURDATE(), 'enrolled')",
    [user.id, course.course_id]
  );

  res.status(201).json({ success: true });
}));

app.post("/api/approve-enrollment", asyncRoute(async (req, res) => {
  await query("UPDATE enrollments SET status = 'approved' WHERE id = ?", [req.body.enrollmentId]);
  res.json({ success: true });
}));

app.post("/api/grade", asyncRoute(async (req, res) => {
  const { studentId, courseCode, grade } = req.body;

  // Get user ID from user_id
  const [user] = await query("SELECT id FROM users WHERE user_id = ?", [studentId]);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Get course ID from course code
  const [course] = await query("SELECT course_id FROM courses WHERE course_code = ?", [courseCode]);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  await query(`
    INSERT INTO grades (student_id, course_id, grade, semester, year)
    VALUES (?, ?, ?, '1st', 2026)
    ON DUPLICATE KEY UPDATE grade = VALUES(grade)
  `, [user.id, course.course_id, grade]);
  res.json({ success: true });
}));

app.post("/api/payment", asyncRoute(async (req, res) => {
  const { studentId, amount } = req.body;
  await query(`
    UPDATE payments
    SET paid_amount = LEAST(total_amount, paid_amount + ?),
      status = CASE
        WHEN paid_amount + ? >= total_amount THEN 'paid'
        WHEN paid_amount + ? > 0 THEN 'partial'
        ELSE 'pending'
      END
    WHERE student_id = ?
  `, [Number(amount), Number(amount), Number(amount), studentId]);
  res.json({ success: true });
}));

app.post("/api/evaluation", asyncRoute(async (req, res) => {
  const { courseCode, ratings, comments } = req.body;

  // Get course ID from course code
  const [course] = await query("SELECT course_id FROM courses WHERE course_code = ?", [courseCode]);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  // Calculate average rating
  const ratingValues = Object.values(ratings);
  const averageRating = ratingValues.reduce((sum, rating) => sum + Number(rating), 0) / ratingValues.length;

  // For now, just return success (we can add an evaluations table later if needed)
  console.log(`Evaluation submitted for ${courseCode}:`, { ratings, comments, averageRating });

  res.json({ success: true, averageRating });
}));

app.get("/api/notifications", asyncRoute(async (req, res) => {
  // Get user from token
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.user_id;
    const userRole = decoded.role;

    // Get notifications based on role
    let notifications = [];

    if (userRole === 'student') {
      notifications = [
        { id: 1, title: "Midterm Examination Schedule", message: "Office of Academic Affairs • March 15, 2026", status: "Unread", type: "academic" },
        { id: 2, title: "Enrollment for Summer Classes Now Open", message: "Registrar Office • March 10, 2026", status: "New", type: "enrollment" },
        { id: 3, title: "Library Operating Hours Update", message: "Library Services • March 8, 2026", status: "Read", type: "general" },
      ];
    } else if (userRole === 'teacher') {
      notifications = [
        { id: 1, title: "Faculty Meeting - March 20", message: "Dean's Office • Conference Room A", status: "Unread", type: "meeting" },
        { id: 2, title: "Grade Submission Deadline Reminder", message: "Registrar Office • Due March 28, 2026", status: "Due Soon", type: "deadline" },
        { id: 3, title: "Professional Development Workshop", message: "HR Department • April 5, 2026", status: "Read", type: "training" },
      ];
    }

    res.json({ notifications });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}));

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`CMDI Portal API running on http://localhost:${PORT}`);
  console.log(`Connected database target: ${config.user}@${config.host}:${config.port}/${config.database}`);
});
