// Dependencies
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const homeRouter = require("../controllers/home");
const usersRouter = require("../controllers/users");
const listsRouter = require("../controllers/lists");
const giftsRouter = require("../controllers/gifts");
const sessionsRouter = require("../controllers/sessions");
const session = require("express-session");

// Tell express to use all middleware here
const middleware = (app) => {
  app.use(methodOverride("_method")); // override for put and delete requests from forms
  app.use(express.urlencoded({ extended: true })); // body parser for express
  app.use(express.static("public")); // serve static css & js files from public
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(morgan("tiny"));
  app.use("/", homeRouter);
  app.use("/users", usersRouter);
  app.use("/lists", listsRouter);
  app.use("/gifts", giftsRouter);
  app.use("/sessions", sessionsRouter); 

};;

// Export middleware function to be called from server
module.exports = middleware;
