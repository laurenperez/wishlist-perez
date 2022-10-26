// Dependencies
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const homeRouter = require("../controllers/home");
const authorsRouter = require("../controllers/authors");
const articlesRouter = require("../controllers/articles");

// Tell express to use all middleware here
const middleware = (app) => {
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // body parser for express
  app.use(express.static("public")); // serve static css & js files from public
  app.use("/", homeRouter); // root route
  app.use("/authors", authorsRouter); // authors routes
  app.use("/articles", articlesRouter); // articles routes
};

// Export middleware function to be called from server
module.exports = middleware;
