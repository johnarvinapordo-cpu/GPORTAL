const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [], courses: [], enrollments: [], grades: [], payments: [], students: [], teachers: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getData(req, res, next) {
  req.data = loadData();
  next();
}

app.use(getData);

app.post('/api/login', (req, res) => {
  try {
    const { userId, password } = req.body;
    const data = req.data;
    
    const user = data.users.find(u => u.user_id === userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    if (password === user.password) {
      return res.json({
        token: 'demo_token_' + user.user_id,
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

app.get('/api/student/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.data;
    
    const student = data.students.find(s => s.user_id === userId) || { user_id: userId, course: '', year_level: 0, gpa: 0 };
    const user = data.users.find(u => u.user_id === userId) || {};
    
    const courseIds = data.enrollments
      .filter(e => e.student_id === userId && e.status === 'approved')
      .map(e => e.course_id);
    const courses = data.courses.filter(c => courseIds.includes(c.id));
    
    const grades = data.grades.filter(g => g.student_id === userId).map(g => {
      const course = data.courses.find(c => c.id === g.course_id);
      return { course_code: course?.course_code || '', midterm: g.midterm, finals: g.finals };
    });
    
    const payments = data.payments.filter(p => p.student_id === userId);
    
    res.json({ student, user, courses, grades, payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/teacher/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.data;
    
    const courses = data.courses.filter(c => c.instructor_id === userId);
    const gradeData = data.grades;
    
    res.json({ courses, grades: gradeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin', (req, res) => {
  try {
    const data = req.data;
    
    const stats = {
      totalStudents: data.users.filter(u => u.role === 'student').length,
      totalTeachers: data.users.filter(u => u.role === 'teacher').length,
      totalCourses: data.courses.length,
      activeEnrollments: data.enrollments.filter(e => e.status === 'approved').length,
    };
    
    res.json({ stats, recentActivity: data.enrollments.slice(-5).reverse() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/registrar', (req, res) => {
  try {
    const data = req.data;
    
    const pendingEnrollments = data.enrollments.filter(e => e.status === 'pending');
    const courses = data.courses;
    
    res.json({ pendingEnrollments, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/finance', (req, res) => {
  try {
    const data = req.data;
    
    const totalExpected = data.payments.reduce((acc, p) => acc + p.total_amount, 0);
    const totalCollected = data.payments.reduce((acc, p) => acc + p.paid_amount, 0);
    const totalBalance = totalExpected - totalCollected;
    const pendingCount = data.payments.filter(p => p.status !== 'paid').length;
    
    const stats = {
      total_expected: totalExpected,
      total_collected: totalCollected,
      total_balance: totalBalance,
      pending_count: pendingCount
    };
    
    res.json({ stats, payments: data.payments.slice(-10) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/enroll', (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const data = loadData();
    
    const newEnrollment = {
      id: data.enrollments.length + 1,
      student_id: studentId,
      course_id: courseId,
      status: 'pending',
      enrolled_at: new Date().toISOString().split('T')[0]
    };
    
    data.enrollments.push(newEnrollment);
    saveData(data);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/approve-enrollment', (req, res) => {
  try {
    const { enrollmentId } = req.body;
    const data = loadData();
    
    const enrollment = data.enrollments.find(e => e.id === enrollmentId);
    if (enrollment) {
      enrollment.status = 'approved';
      saveData(data);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`CMDI Portal Server running on http://localhost:${PORT}`);
});
