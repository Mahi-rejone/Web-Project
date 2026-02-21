const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//connect to database
let connection;
const dbconfig = {
  host: "localhost",
  user: "root",
  password: "1575",
  database: "TechPilot",
};
async function connectDB() {
  connection = await mysql.createConnection(dbconfig);
  console.log("✅ Connected to database");
}

//middeleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

//routes
app.get("/", (req, res) => {
  res.render("home");
});

//show all
app.get("/listings", async (req, res) => {
  try {
    const [allListings] = await connection.execute("SELECT * FROM products");
    res.render("listings", { listings: allListings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
// Route to create a new listing form
app.get("/listings/new", async (req, res) => {
  res.render("new");
});

// Route to handle form submission and create a new listing
app.post("/listings", async (req, res) => {
  try {
    const {
      name,
      category,
      short_description,
      image_url,
      price,
      status,
      brand,
      key_features,
    } = req.body;
    const [result] = await connection.execute(
      `INSERT INTO products (name, category, short_description, image_url)
       VALUES (?, ?, ?, ?)`,
      [name, category, short_description, image_url],
    );

    const productCode = result.insertId;
    await connection.execute(
      `INSERT INTO product_details
       (product_code, price, status, brand, key_features)
       VALUES (?, ?, ?, ?, ?)`,
      [productCode, price, status, brand, key_features],
    );

    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting product");
  }
});

// Route to display edit form for a listing
app.get("/listings/:id/edit", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const [detailsRows] = await connection.execute(
      "SELECT * FROM product_details WHERE product_code = ?",
      [id],
    );

    const [productRows] = await connection.execute(
      "SELECT * FROM products WHERE product_code = ?",
      [id],
    );

    if (productRows.length === 0 || detailsRows.length === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }
    const listing = {
      ...productRows[0],
      ...detailsRows[0],
    };

    res.render("edit", { listing });
  } catch (error) {
    console.error("Error fetching listing for edit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to display a single listing by ID
app.get("/listings/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    const [detailsRows] = await connection.execute(
      "SELECT * FROM product_details WHERE product_code = ?",
      [id],
    );

    const [productRows] = await connection.execute(
      "SELECT * FROM products WHERE product_code = ?",
      [id],
    );

    if (productRows.length === 0 || detailsRows.length === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }
    const listing = {
      ...productRows[0],
      ...detailsRows[0],
    };

    res.render("show.ejs", { listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//route to update
app.put("/listings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const listingData = req.body.listing;

    await connection.execute(
      `UPDATE products
       SET name = ?, category = ?, short_description = ?, image_url = ?
       WHERE product_code = ?`,
      [
        listingData.name,
        listingData.category,
        listingData.short_description,
        listingData.image_url,
        id,
      ],
    );

    await connection.execute(
      `UPDATE product_details
       SET price = ?, status = ?, brand = ?,key_features=?
       WHERE product_code = ?`,
      [
        listingData.price,
        listingData.status,
        listingData.brand,
        listingData.key_features,
        id,
      ],
    );

    res.redirect("/listings");
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delet listing
app.delete("/listings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await connection.execute("DELETE FROM products WHERE product_code = ?", [
      id,
    ]);
    res.redirect("/listings");
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Start server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server started at port: ${port}`);
});
