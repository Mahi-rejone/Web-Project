const express = require("express");
const { connectDB, getConnection } = require("./db");
const path = require("path");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listings.js") ;
const messages = require("./routes/message.js") ;
const signup = require("./routes/signup.js") ;


//middleware
app.setMaxListeners(15);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Connection middleware - ATTACH DB TO EVERY REQUEST
app.use((req, res, next) => {
  try {
    req.db = getConnection();
    next();
  } catch (err) {
    next(err);
  }
});

//home route
app.get("/", async (req, res) => {
  try {
    const result = await req.db.query("SELECT * FROM products");
    res.render("home", { listings: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.use("/listings", listings);
app.use("/message", messages);
app.use("/signup", signup);

//start server
app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Server started at port: ${port}`);
});