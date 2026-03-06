const express = require("express");
const { connectDB, getConnection } = require("./db");
const path = require("path");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listings.js");
const messages = require("./routes/message.js");
const signup = require("./routes/signup.js");
const wrapAsync = require("./util/wrapAsync");
const ExpressError = require("./util/expressError");
const session = require("express-session");
const flash = require("connect-flash");

// Session configuration
const sessionOptions = {
  secret: "SESSION_SECRET", // Change this in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

// Middleware
app.setMaxListeners(15);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

app.use(session(sessionOptions));
app.use(flash()); 

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Connection middleware
app.use((req, res, next) => {
  try {
    req.db = getConnection();
    next();
  } catch (err) {
    next(err);
  }
});

// Routes
app.get("/", wrapAsync(async (req, res) => {
  const result = await req.db.query("SELECT * FROM products");
  res.render("home", { listings: result.rows });
}));

// Test route for flash
app.get("/test-flash", (req, res) => {
  req.flash("success", "✅ Flash is working! This is a test message.");
  res.redirect("/listings");
});

// Use routers
app.use("/listings", listings);
app.use("/message", messages);
app.use("/signup", signup);

// 404 handler
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  console.error("Error:", err);
  req.flash("error", message);
  res.status(statusCode);
  res.render("error", { message });
});

// Start server
app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Server started at port: ${port}`);
});