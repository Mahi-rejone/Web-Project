const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/expressError");

//show all listings
router.get("/", wrapAsync(async (req, res) => {
  const result = await req.db.query("SELECT * FROM products ORDER BY product_code DESC");
  res.render("listings", { listings: result.rows });
}));

//new listing form
router.get("/new", (req, res) => {
  res.render("new");
});

//create listing
router.post("/", wrapAsync(async (req, res) => {
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

  // Basic validation
  if (!name || !price) {
    req.flash("error", "Name and price are required!");
    return res.redirect("/listings/new");
  }

  const result = await req.db.query(
    `INSERT INTO products (name, category, short_description, image_url)
     VALUES ($1,$2,$3,$4)
     RETURNING product_code`,
    [name, category, short_description, image_url],
  );

  const productCode = result.rows[0].product_code;

  await req.db.query(
    `INSERT INTO product_details
     (product_code, price, status, brand, key_features)
     VALUES ($1,$2,$3,$4,$5)`,
    [productCode, price, status, brand, key_features],
  );
  
  req.flash("success", "✨ New listing created successfully!");
  res.redirect("/listings");
}));

//edit form
router.get("/:id/edit", wrapAsync(async (req, res) => {
  const id = parseInt(req.params.id);

  const productResult = await req.db.query(
    "SELECT * FROM products WHERE product_code = $1",
    [id],
  );

  if (productResult.rows.length === 0) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  const detailsResult = await req.db.query(
    "SELECT * FROM product_details WHERE product_code = $1",
    [id],
  );

  const listing = {
    ...productResult.rows[0],
    ...detailsResult.rows[0],
  };

  res.render("edit", { listing });
}));

//show single listing
router.get("/:id", wrapAsync(async (req, res) => {
  const id = parseInt(req.params.id);

  const productResult = await req.db.query(
    "SELECT * FROM products WHERE product_code = $1",
    [id],
  );

  if (productResult.rows.length === 0) {
    req.flash("error", "Listing doesn't exist");
    return res.redirect("/listings");
  }

  const detailsResult = await req.db.query(
    "SELECT * FROM product_details WHERE product_code = $1",
    [id],
  );

  const listing = {
    ...productResult.rows[0],
    ...detailsResult.rows[0],
  };
  
  res.render("show", { listing });
}));

//update listing
router.put("/:id", wrapAsync(async (req, res) => {
  const id = parseInt(req.params.id);
  const listingData = req.body.listing;

  // Check if listing exists
  const checkResult = await req.db.query(
    "SELECT * FROM products WHERE product_code = $1",
    [id]
  );

  if (checkResult.rows.length === 0) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  await req.db.query(
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

  await req.db.query(
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
  
  req.flash("success", "✏️ Listing updated successfully!");
  res.redirect("/listings");
}));

//delete listing
router.delete("/:id", wrapAsync(async (req, res) => {
  const id = parseInt(req.params.id);

  // Check if listing exists before deleting
  const checkResult = await req.db.query(
    "SELECT * FROM products WHERE product_code = $1",
    [id]
  );

  if (checkResult.rows.length === 0) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  await req.db.query("DELETE FROM products WHERE product_code = $1", [id]);
  req.flash("success", "🗑️ Listing deleted successfully!");
  res.redirect("/listings");
}));

module.exports = router;