const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/expressError");
const passport = require("passport"); // ✅ IMPORT PASSPORT HERE

// Show signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle signup form submission
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    const userData = req.body.user;

    // Check if user exists
    const existingUser = await req.db.query(
      "SELECT * FROM users WHERE email = $1",
      [userData.email],
    );

    if (existingUser.rows.length > 0) {
      req.flash("error", "User exists, please log in");
      return res.redirect("/user/login"); // ✅ Fixed: Added return
    }

    // Password validation
    if (userData.password.length < 8) {
      throw new ExpressError(400, "Password should be at least 8 characters");
    }
    if (userData.password !== userData.password2) {
      // ✅ Fixed: !== not !=
      throw new ExpressError(400, "Passwords don't match");
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(userData.password, 13);
    await req.db.query(
      `INSERT INTO users (name, email, password, image_url) 
       VALUES ($1, $2, $3, $4)`,
      [
        userData.name,
        userData.email,
        hashedPassword,
        userData.image_url || null,
      ],
    );

    req.flash("success", "You are now registered. Please log in");
    res.redirect("/user/login");
  }),
);

// Show login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle login form submission
router.post("/login", (req, res, next) => {
  // Map nested fields to top level for passport
  if (req.body.user) {
    req.body.email = req.body.user.email;
    req.body.password = req.body.user.password;
  }
  next();
}, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", info?.message || "Invalid credentials");
      return res.redirect("/user/login");
    }
    req.login(user, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome back, ${user.name}!`);
      res.redirect("/");
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      req.flash("error", "Error logging out");
      return res.redirect("/");
    }

    req.flash("success", "You have been logged out");
    res.redirect("/");
  });
});

module.exports = router;
