const express = require("express");
const router = express.Router();
const { getConnection } = require("../db");

// Connection middleware - ATTACH DB TO EVERY REQUEST
router.use((req, res, next) => {
  try {
    req.db = getConnection();
    next();
  } catch (err) {
    next(err);
  }
});

//send message
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    await req.db.query(`INSERT INTO messages (message) VALUES ($1)`, [message]);
    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending message");
  }
});

//show messages
router.get("/", async (req, res) => {
  try {
    const result = await req.db.query("SELECT * FROM messages");
    res.render("message", { messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching message");
  }
});

module.exports = router;