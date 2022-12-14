// Dependencies
const mongoose = require("./connection");

// Destructure schema and model from mongoose
const { Schema, model } = mongoose;

// Define gift schema
const giftSchema = new Schema({
  owner: String,
  name: String,
  retailer: String,
  url: String,
  imageUrl: {
    type: String,
    default: "/img/gifts.jpg",
  },
  details: String,
  price: String,
  purchased: { type: Boolean, default: false },
});

// Create gift model
const Gift = model("Gift", giftSchema);

// Export model
module.exports = Gift;
