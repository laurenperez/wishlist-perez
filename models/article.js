// Dependencies
const mongoose = require("./connection");

// Destructure schema and model from mongoose
const { Schema, model } = mongoose;

// Define article schema
const articleSchema = new Schema({
  title: String,
  body: String,
});

// Create article model
const Article = model("Article", articleSchema);

// Export model
module.exports = Article;
