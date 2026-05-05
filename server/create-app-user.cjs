const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const { loadEnv } = require("./env.cjs");

loadEnv();

const host = process.env.DB_HOST || "127.0.0.1";
const port = Number(process.env.DB_PORT || 3306);
const rootUser = process.env.ROOT_DB_USER || "root";
const rootPassword = process.env.ROOT_DB_PASSWORD || "";
const sqlFile = path.join(__dirname, "create-app-user.sql");

async function main() {
  if (!fs.existsSync(sqlFile)) {
    throw new Error(`Missing SQL file: ${sqlFile}`);
  }

  const sql = fs.readFileSync(sqlFile, "utf8");
  const connection = await mysql.createConnection({
    host,
    port,
    user: rootUser,
    password: rootPassword,
    multipleStatements: true,
  });

  await connection.query(sql);
  await connection.end();
  console.log("cmdi_app user created or updated successfully.");
}

main().catch((error) => {
  console.error("Failed to create cmdi_app user:", error.message);
  process.exit(1);
});
