const { Client } = require("pg");
const sampleData = require("./data.js");

const dbconfig = {
  host: "localhost",
  user: "postgres",
  password: "1575",
  database: "TechPilot",
  port: 5432,
};

async function setDataBase() {
  let connection;

  try {
    connection = new Client(dbconfig);
    await connection.connect();

    console.log("✅ Connected to PostgreSQL");

    // Drop tables
    await connection.query(`DROP TABLE IF EXISTS product_details CASCADE`);
    await connection.query(`DROP TABLE IF EXISTS messages CASCADE`);
    await connection.query(`DROP TABLE IF EXISTS products CASCADE`);
    await connection.query(`DROP TABLE IF EXISTS  users CASCADE`);

    console.log("✅ Existing tables dropped");

    // Create products table
    await connection.query(`
      CREATE TABLE products (
        product_code SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        short_description VARCHAR(500),
        image_url VARCHAR(255)
      )
    `);

    console.log("✅ Products table created");

    // Create product details
    await connection.query(`
      CREATE TABLE product_details (
        product_code INT PRIMARY KEY,
        price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Available',
        brand VARCHAR(100),
        key_features TEXT,
        FOREIGN KEY (product_code)
        REFERENCES products(product_code)
        ON DELETE CASCADE
      )
    `);

    console.log("✅ Product details table created");

    // Create messages table
    await connection.query(`
      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ Messages table created");

    //Create User Table
    await connection.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        image_url VARCHAR(500) DEFAULT 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
      )
    `);
    console.log("✅ Users table created");

    // Insert products
    for (const product of sampleData.products) {
      await connection.query(
        `INSERT INTO products (name, category, short_description, image_url)
         VALUES ($1,$2,$3,$4)`,
        product,
      );
    }

    console.log(`✅ ${sampleData.products.length} products inserted`);

    // Insert product details
    for (const detail of sampleData.productDetails) {
      await connection.query(
        `INSERT INTO product_details (product_code, price, status, brand, key_features)
         VALUES ($1,$2,$3,$4,$5)`,
        detail,
      );
    }

    console.log(
      `✅ ${sampleData.productDetails.length} product details inserted`,
    );

    // Insert messages
    for (const message of sampleData.messages) {
      await connection.query(`INSERT INTO messages (message) VALUES ($1)`, [
        message,
      ]);
    }

    console.log(`✅ ${sampleData.messages.length} messages inserted`);

    // Insert product details
    for (const user of sampleData.user) {
      await connection.query(
        `INSERT INTO users (name, email, password, image_url) 
        VALUES ($1, $2, $3, $4)`,
        user
      );
    }
    console.log(`✅ ${sampleData.user.length} user inserted`);
  } catch (error) {
    console.error("❌ Error setting up database:", error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log("Database connection closed");
    }
  }
}

setDataBase();
