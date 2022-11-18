// Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const sessionsRouter = express.Router();
const User = require("../models/user.js");


// LOG OUT - Session Delete Route
sessionsRouter.get("/delete", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/");
  });
});


// LOGIN - Session Create Route
sessionsRouter.post("/", (req, res) => {
  User.findOne({username: req.body.username},
    (error, foundUser) => {
      console.log(foundUser)
      if (!foundUser) {
        res.render("home.ejs", {error: true, message: "Hmmm... No User was found. Try again or Sign up for an account!"})
      } else {
        const passwordMatches = bcrypt.compareSync(
          req.body.password,
          foundUser.password
        )
        if (passwordMatches) {
          req.session.currentUser = foundUser
          res.redirect("/users")
        } else {
          res.render("home.ejs", {
            error: true,
            message:
              "Incorrect password, try again or ask Lauren to reset it!",
          });
        }
      }
    }
  )
})


// Export Sessions Router
module.exports = sessionsRouter