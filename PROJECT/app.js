const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const dbURL = "mongodb://127.0.0.1:27017/TripTracker";
const Listing = require("./model/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

//middeleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use (express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Routes
app.get("/", (req, res) => {
  res.send("home page");
});

// Route to display all listings
app.get("/listings", async (req, res) => {
    try {
        const alllistings = await Listing.find();
        res.render("listings/index.ejs", { listings: alllistings });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to create a new listing form
app.get("/listings/new", async (req, res) => {
    res.render("listings/new");
});


// Route to handle form submission and create a new listing
app.post("/listings", async (req, res) => {
    try {
        let listingData = req.body.listing;
        let newListing = new Listing(listingData);
        await newListing.save();
        res.redirect("/listings");
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to display edit form for a listing
app.get("/listings/:id/edit", async (req, res) => {
    try {
        let id = req.params.id;
        const listing = await Listing.findById(id);
        if (listing==null) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.render("listings/edit", { listing });
    } catch (error) {
        console.error("Error fetching listing for edit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to handel delete listing
app.delete("/listings/:id", async (req, res) => {
    try {
        let id = req.params.id;
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Route to handle form submission and update a listing
app.put("/listings/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let listingData = req.body.listing;
        await Listing.findByIdAndUpdate(id, listingData);
        res.redirect("/listings");
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to display a single listing by ID
app.get("/listings/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const listing = await Listing.findById(id);
        if (listing==null) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.render("listings/show", { listing });
    }
    catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
