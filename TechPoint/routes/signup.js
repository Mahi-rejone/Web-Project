const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/expressError");

// Show signup form
router.get("/", (req, res) => {
  res.render("signup");
});

// Handle signup form submission
router.post("/", wrapAsync(async (req, res) => {
  const userData = req.body.user;
  
  // Check if user exists
  const existingUser = await req.db.query(
    "SELECT * FROM users WHERE email = $1",
    [userData.email]
  );
  
  if (existingUser.rows.length > 0) {
    throw new ExpressError(400, "User with this email already exists");
  }
  
  // Hash password and create user
  const hashedPassword = await bcrypt.hash(userData.password, 13);
  await req.db.query(
    `INSERT INTO users (name, email, password, image_url) 
     VALUES ($1, $2, $3, $4)`,
    [userData.name, userData.email, hashedPassword, userData.image_url || null]
  );

  res.redirect("/?signup=success");
}));

module.exports = router;