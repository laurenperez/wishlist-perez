// Dependencies
const mongoose = require("./connection");
const Article = require("./article");

// Destructure schema and model from mongoose
const { Schema, model } = mongoose;

// Define author schema
const authorSchema = new Schema({
  name: String,
  articles: [Article.schema],
  },
  { timestamps: true }
);

// Create author model
const Author = model("Author", authorSchema);

// Export model
module.exports = Author;
