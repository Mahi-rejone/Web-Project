const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

//show all listings
router.get("/", async (req, res) => {
  try {
    const connection = getConnection();
    const result = await connection.query("SELECT * FROM products");
    res.render("listings", { listings: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//new listing form
router.get("/new", (req, res) => {
  res.render("new");
});

//create listing
router.post("/", async (req, res) => {
  try {
    const connection = getConnection(); // ✅ ADD THIS LINE
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

    const result = await connection.query(
      `INSERT INTO products (name, category, short_description, image_url)
       VALUES ($1,$2,$3,$4)
       RETURNING product_code`,
      [name, category, short_description, image_url],
    );

    const productCode = result.rows[0].product_code;

    await connection.query(
      `INSERT INTO product_details
       (product_code, price, status, brand, key_features)
       VALUES ($1,$2,$3,$4,$5)`,
      [productCode, price, status, brand, key_features],
    );

    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting product");
  }
});

//edit form
router.get("/:id/edit", async (req, res) => {
  try {
    const connection = getConnection(); // ✅ ADD THIS LINE
    const id = parseInt(req.params.id);

    const detailsResult = await connection.query(
      "SELECT * FROM product_details WHERE product_code = $1",
      [id],
    );

    const productResult = await connection.query(
      "SELECT * FROM products WHERE product_code = $1",
      [id],
    );

    if (productResult.rows.length === 0 || detailsResult.rows.length === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const listing = {
      ...productResult.rows[0],
      ...detailsResult.rows[0],
    };

    res.render("edit", { listing });
  } catch (error) {
    console.error("Error fetching listing for edit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//show single listing
router.get("/:id", async (req, res) => {
  try {
    const connection = getConnection(); // ✅ ADD THIS LINE
    const id = parseInt(req.params.id);

    const detailsResult = await connection.query(
      "SELECT * FROM product_details WHERE product_code = $1",
      [id],
    );

    const productResult = await connection.query(
      "SELECT * FROM products WHERE product_code = $1",
      [id],
    );

    if (productResult.rows.length === 0 || detailsResult.rows.length === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const listing = {
      ...productResult.rows[0],
      ...detailsResult.rows[0],
    };

    res.render("show", { listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update listing
router.put("/:id", async (req, res) => {
  try {
    const connection = getConnection(); // ✅ ADD THIS LINE
    const id = parseInt(req.params.id);
    const listingData = req.body.listing;

    await connection.query(
      `UPDATE products
       SET name=$1, category=$2, short_description=$3, image_url=$4
       WHERE product_code=$5`,
      [
        listingData.name,
        listingData.category,
        listingData.short_description,
        listingData.image_url,
        id,
      ],
    );

    await connection.query(
      `UPDATE product_details
       SET price=$1, status=$2, brand=$3, key_features=$4
       WHERE product_code=$5`,
      [
        listingData.price,
        listingData.status,
        listingData.brand,
        listingData.key_features,
        id,
      ],
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete listing
router.delete("/:id", async (req, res) => {
  try {
    const connection = getConnection(); // ✅ ADD THIS LINE
    const id = parseInt(req.params.id);

    await connection.query("DELETE FROM products WHERE product_code = $1", [
      id,
    ]);

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;