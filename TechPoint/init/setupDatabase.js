const mysql = require("mysql2/promise");
const sampleData = require("./data.js");

const dbconfig = {
  host: "localhost",
  user: "root",
  password: "1575",
  database: "TechPilot",
};

async function setDataBase() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: dbconfig.host,
      user: dbconfig.user,
      password: dbconfig.password,
    });
    //Create and clear database
    await connection.query(`CREATE DATABASE IF NOT EXISTS TechPilot`);
    await connection.query(`USE TechPilot`);
    await connection.query(`DROP TABLE IF EXISTS product_details`);
    await connection.query(`DROP TABLE IF EXISTS messages`);
    await connection.query(`DROP TABLE IF EXISTS products`);
    console.log("✅ Existing tables dropped");
    //Create products table
    await connection.query(`
            CREATE TABLE products (
                product_code INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100),
                short_description VARCHAR(500),
                image_url VARCHAR(255)
            )
        `);
    console.log("✅ Products table created");
    //Create Product Details
    await connection.query(`
            CREATE TABLE product_details (
                product_code INT PRIMARY KEY,
                price DECIMAL(10,2) NOT NULL,
                status ENUM('Available','Out of Stock','Discontinued') DEFAULT 'Available',
                brand VARCHAR(100),
                key_features TEXT,
                FOREIGN KEY (product_code) REFERENCES products(product_code) ON DELETE CASCADE
            )
        `);
    console.log("✅ Product details table created");
    //Create Massage Table
    await connection.query(`
            CREATE TABLE messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    console.log("✅ Messages table created");
    // Insert products
    for (const product of sampleData.products) {
      await connection.query(
        "INSERT INTO products (name, category, short_description, image_url) VALUES (?, ?, ?, ?)",
        product,
      );
    }
    console.log(`✅ ${sampleData.products.length} products inserted`);

    // Insert product details
    for (const detail of sampleData.productDetails) {
      await connection.query(
        "INSERT INTO product_details (product_code, price, status, brand, key_features) VALUES (?, ?, ?, ?, ?)",
        detail,
      );
    }
    console.log(
      `✅ ${sampleData.productDetails.length} product details inserted`,
    );

    // Insert messages
    for (const message of sampleData.messages) {
      await connection.query("INSERT INTO messages (message) VALUES (?)", [
        message,
      ]);
    }
    console.log(`✅ ${sampleData.messages.length} messages inserted`);
  } catch (error){
    console.error("❌ Error setting up database:", error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log("\nDatabase connection closed");
    }
  }
}

setDataBase();