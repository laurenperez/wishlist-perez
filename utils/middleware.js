// Dependencies
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const homeRouter = require("../controllers/home");
const listsRouter = require("../controllers/lists");
const giftsRouter = require("../controllers/gifts");

// Tell express to use all middleware here
const middleware = (app) => {
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // body parser for express
  app.use(express.static("public")); // serve static css & js files from public
  app.use("/", homeRouter); // root route
  app.use("/lists", listsRouter); // lists routes
  app.use("/gifts", giftsRouter); // gifts routes
};

// Export middleware function to be called from server
module.exports = middleware;
