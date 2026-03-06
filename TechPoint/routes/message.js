const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync");

// POST /message - send a message
router.post("/", wrapAsync(async (req, res) => {
  const { message } = req.body;
  await req.db.query(`INSERT INTO messages (message) VALUES ($1)`, [message]);
  req.flash("success", "Message Sent successfully!");
  res.redirect("/");
}));

// GET /message - show all messages
router.get("/", wrapAsync(async (req, res) => {
  const result = await req.db.query("SELECT * FROM messages ORDER BY created_at DESC");
  res.render("message", { messages: result.rows });
}));

module.exports = router;