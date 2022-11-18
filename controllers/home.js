// Dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Generic Lnding Page Log In Here - option to sign up
router.get("/", (req, res) => {
  res.render("home.ejs", { error: false });
});



module.exports = router;
