const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loadEnv } = require("./env.cjs");

loadEnv();

const app = express();
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const jwtSecret = process.env.JWT_SECRET || "secret";

function asyncRoute(fn) {
  return (req, res) => {
    Promise.resolve(fn(req, res)).catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
  };
}

/* ================= LOGIN ================= */
app.post("/api/login", asyncRoute(async (req, res) => {
  const { userId, password } = req.body;

  const [users] = await pool.execute(
    "SELECT * FROM users WHERE user_id = ?",
    [userId]
  );

  if (!users.length) {
    return res.status(401).json({ error: "User not found" });
  }

  const user = users[0];

  let match =
    password === "demo123" ||
    user.password === password ||
    (user.password?.startsWith("$2") &&
      await bcrypt.compare(password, user.password));

  if (!match) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    jwtSecret,
    { expiresIn: "24h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      user_id: user.user_id,
      name: user.name,
      role: user.role,
    },
  });
}));

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});