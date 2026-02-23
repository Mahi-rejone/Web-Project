const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../model/listing.js");
const dbURL = "mongodb://127.0.0.1:27017/TripTracker";

async function connectToDatabase() {
  await mongoose.connect(dbURL);
}
connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
const initListings = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};
initListings();
