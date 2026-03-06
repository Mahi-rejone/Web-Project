const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");
const bcrypt = require('bcrypt');

// Connection middleware - ATTACH DB TO EVERY REQUEST
router.use((req, res, next) => {
  try {
    req.db = getConnection();
    next();
  } catch (err) {
    next(err);
  }
});

//signup route
router.post("/", async (req, res) => {
  try {
    const userData = req.body.user;
    const existingUser = await req.db.query(
      "SELECT * FROM users WHERE email = $1",
      [userData.email]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).send("User with this email already exists");
    }
    
    const hashedPassword = await bcrypt.hash(userData.password, 13);
    await req.db.query(
      `INSERT INTO users (name, email, password, image_url) 
       VALUES ($1, $2, $3, $4)`,
      [userData.name, userData.email, hashedPassword, userData.image_url || null]
    );

    res.redirect("/?signup=success");

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Error creating account");
  }
});

//show sign up page
router.get("/", (req, res) => {
  res.render("signup");
});

module.exports = router;