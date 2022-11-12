// Dependencies
const mongoose = require("./connection");
const List = require("./list");

// Destructure schema and model from mongoose
const { Schema, model } = mongoose;

// Define User schema
const userSchema = new Schema(
  {
    name: String,
    address: String,
    family: String,
    lists: [List.schema],
  },
  { timestamps: true }
);

// Create User model
const User = model("User", userSchema);

// Export model
module.exports = User;
