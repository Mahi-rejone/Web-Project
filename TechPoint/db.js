const { Client } = require("pg");

const dbconfig = {
  host: "localhost",
  user: "postgres",
  password: "1575",
  database: "TechPilot",
  port: 5432,
};

let connection;

async function connectDB() {
  connection = new Client(dbconfig);
  await connection.connect();
  console.log("✅ Connected to PostgreSQL database");
  return connection;
}

function getConnection() {
  if (!connection) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return connection;
}

module.exports = { connectDB, getConnection };