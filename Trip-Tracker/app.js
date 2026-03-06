const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const dbURL = "mongodb://127.0.0.1:27017/TripTracker";
const Listing = require("./model/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./util/wrapAsync");
const ExpressError = require("./util/expressError");

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToDatabase();

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Routes
app.get("/", (req, res) => {
  res.send("home page");
});

// Route to display all listings
app.get("/listings", async (req, res, next) => {
  try {
    const alllistings = await Listing.find();
    res.render("listings/index", { listings: alllistings });
  } catch (error) {
    console.error("Error fetching listings:", error);
    next(error);
  }
});

// Route to create a new listing form
app.get("/listings/new", (req, res) => { // Removed async since no await
  res.render("listings/new");
});

// Route to handle form submission and create a new listing
app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    let listingData = req.body.listing;
    let newListing = new Listing(listingData);
    await newListing.save();
    res.redirect("/listings");
  })
);

// Route to display edit form for a listing
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/edit", { listing });
}));

// Route to handle delete listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

// Route to handle form submission and update a listing
app.put("/listings/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  let listingData = req.body.listing;
  await Listing.findByIdAndUpdate(id, listingData);
  res.redirect("/listings");
}));

// Route to display a single listing by ID
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  res.render("listings/show", { listing });
}));

// 404 handler for non-existent routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Global error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  
  console.error("Error:", err); // Log the error for debugging
  
  res.status(statusCode);
  res.render("listings/error", { message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});