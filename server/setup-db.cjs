const mysql = require("mysql2/promise");
const { loadEnv } = require("./env.cjs");

loadEnv();

const config = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "cmdi_portal",
};

async function run(connection, sql) {
  for (const statement of sql.split(";").map((item) => item.trim()).filter(Boolean)) {
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

  await ensureColumn(connection, "students", "status", "status VARCHAR(30) DEFAULT 'Active'");
  await connection.query("ALTER TABLE students MODIFY year_level VARCHAR(30)");
  await ensureColumn(connection, "teachers", "status", "status VARCHAR(30) DEFAULT 'Active'");
  await ensureColumn(connection, "courses", "department", "department VARCHAR(100)");
  await ensureColumn(connection, "courses", "section", "section VARCHAR(20) DEFAULT 'A'");
  await ensureColumn(connection, "courses", "room", "room VARCHAR(80)");
  await ensureColumn(connection, "courses", "semester", "semester VARCHAR(30) DEFAULT '2nd'");
  await ensureColumn(connection, "payments", "payment_ref", "payment_ref VARCHAR(50)");
  await ensureColumn(connection, "payments", "method", "method VARCHAR(50)");
  await ensureIndex(connection, "payments", "unique_payment_ref", "ALTER TABLE payments ADD UNIQUE KEY unique_payment_ref (payment_ref)");

  await connection.query(`
    INSERT INTO users (user_id, name, email, password, role) VALUES
      ('STU-001', 'Juan Dela Cruz', 'juan@cmdi.edu', 'demo123', 'student'),
      ('STU-002', 'Maria Garcia', 'maria.garcia@cmdi.edu', 'demo123', 'student'),
      ('STU-003', 'Jose Santos', 'jose.santos@cmdi.edu', 'demo123', 'student'),
      ('TCH-001', 'Prof. Maria Santos', 'maria@cmdi.edu', 'demo123', 'teacher'),
      ('TCH-002', 'Prof. Jose Garcia', 'jose.garcia@cmdi.edu', 'demo123', 'teacher'),
      ('ADM-001', 'Admin User', 'admin@cmdi.edu', 'demo123', 'admin'),
      ('REG-001', 'Registrar User', 'registrar@cmdi.edu', 'demo123', 'registrar'),
      ('FIN-001', 'Finance User', 'finance@cmdi.edu', 'demo123', 'finance')
    ON DUPLICATE KEY UPDATE name = VALUES(name), email = VALUES(email), password = VALUES(password), role = VALUES(role)
  `);

  await connection.query(`
    INSERT INTO students (user_id, course, year_level, gpa, status) VALUES
      ('STU-001', 'BS Computer Science', '4th Year', 1.75, 'Active'),
      ('STU-002', 'BS Computer Science', '4th Year', 1.50, 'Active'),
      ('STU-003', 'BS Business Administration', '3rd Year', 2.00, 'Active')
    ON DUPLICATE KEY UPDATE course = VALUES(course), year_level = VALUES(year_level), gpa = VALUES(gpa), status = VALUES(status)
  `);

  await connection.query(`
    INSERT INTO teachers (user_id, department, status) VALUES
      ('TCH-001', 'Computer Science', 'Active'),
      ('TCH-002', 'Mathematics', 'Active')
    ON DUPLICATE KEY UPDATE department = VALUES(department), status = VALUES(status)
  `);

  await connection.query(`
    INSERT INTO courses (course_code, title, department, units, section, schedule, room, instructor_id, capacity, semester) VALUES
      ('CS101', 'Introduction to Programming', 'Computer Science', 3, 'A', 'MWF 9:00-10:00 AM', 'Lab 101', 'TCH-001', 40, '2nd'),
      ('CS201', 'Data Structures and Algorithms', 'Computer Science', 3, 'B', 'TTh 10:00-11:30 AM', 'Lab 102', 'TCH-001', 35, '2nd'),
      ('CS301', 'Software Engineering', 'Computer Science', 3, 'A', 'MWF 2:00-3:00 PM', 'Lab 103', 'TCH-001', 35, '2nd'),
      ('MATH201', 'Calculus I', 'Mathematics', 3, 'A', 'TTh 1:00-2:30 PM', 'Room 201', 'TCH-002', 45, '2nd'),
      ('ENG102', 'English Composition', 'English', 3, 'A', 'MWF 1:00-2:00 PM', 'Room 301', 'TCH-001', 40, '2nd'),
      ('PE101', 'Physical Education', 'Physical Education', 2, 'A', 'TTh 3:00-4:30 PM', 'Gym', 'TCH-001', 50, '2nd')
    ON DUPLICATE KEY UPDATE title = VALUES(title), department = VALUES(department), units = VALUES(units),
      section = VALUES(section), schedule = VALUES(schedule), room = VALUES(room), instructor_id = VALUES(instructor_id),
      capacity = VALUES(capacity), semester = VALUES(semester)
  `);

  await connection.query(`
    INSERT IGNORE INTO enrollments (student_id, course_id, status)
    SELECT 'STU-001', id, 'approved' FROM courses WHERE course_code IN ('CS101', 'CS201', 'MATH201', 'ENG102', 'PE101')
  `);

  await connection.query(`
    INSERT INTO grades (student_id, course_id, midterm, finals)
    SELECT 'STU-001', id,
      CASE course_code
        WHEN 'CS101' THEN 1.75
        WHEN 'MATH201' THEN 2.00
        WHEN 'ENG102' THEN 1.50
        ELSE 1.25
      END,
      CASE course_code
        WHEN 'CS101' THEN 1.50
        WHEN 'MATH201' THEN 2.25
        WHEN 'ENG102' THEN 1.75
        ELSE 1.25
      END
    FROM courses WHERE course_code IN ('CS101', 'MATH201', 'ENG102', 'PE101')
    ON DUPLICATE KEY UPDATE midterm = VALUES(midterm), finals = VALUES(finals)
  `);

  await connection.query(`
    INSERT INTO payments (student_id, payment_ref, total_amount, paid_amount, method, due_date, status) VALUES
      ('STU-001', 'PAY-2026-001', 10000, 10000, 'Bank Transfer', '2026-01-15', 'paid'),
      ('STU-001', 'PAY-2026-002', 5000, 5000, 'Cash', '2026-02-10', 'paid'),
      ('STU-001', 'PAY-2026-003', 10000, 10000, 'Credit Card', '2026-03-05', 'paid'),
      ('STU-002', 'PAY-2026-004', 25000, 12000, 'Bank Transfer', '2026-05-15', 'partial'),
      ('STU-003', 'PAY-2026-005', 25000, 0, 'Cashier', '2026-05-20', 'pending')
    ON DUPLICATE KEY UPDATE paid_amount = VALUES(paid_amount), status = VALUES(status)
  `);

  console.log(`Database '${config.database}' is ready with demo data.`);
  await connection.end();
}

setup().catch((error) => {
  console.error("Database setup failed:");
  console.error(error.message);
  process.exit(1);
});
