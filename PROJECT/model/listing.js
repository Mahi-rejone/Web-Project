const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
  title: { type: String, required: true },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1769410737107-be6ba1e01347?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set(value) {
      return value === ""
        ? "https://images.unsplash.com/photo-1769410737107-be6ba1e01347?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : value;
    },
  },
  price: Number,
  location: String,
  country: String,
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
