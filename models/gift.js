// Dependencies
const mongoose = require("./connection");

// Destructure schema and model from mongoose
const { Schema, model } = mongoose;

// Define gift schema
const giftSchema = new Schema({
  name: String,
  retailer: String,
  url: String,
  imageUrl: String,
  details: String,
  price: String,
  purchansed: Boolean,
});

// Create gift model
const Gift = model("Gift", giftSchema);

// Export model
module.exports = Gift;
