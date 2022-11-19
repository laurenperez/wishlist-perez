// Dependencies
const mongoose = require("./connection");
const Gift = require("./gift");

// Destructure schema and model from mongoose
const { Schema, model } = mongoose;

// Define list schema
const listSchema = new Schema(
  {
    owner: String,
    title: String,
    listType: String,
    gifts: [Gift.schema],
  },
  { timestamps: true }
);

// Create list model
const List = model("List", listSchema);

// Export model
module.exports = List;
