// Dependencies
const express = require("express");
const router = express.Router();
const Author = require("../models/author")

// I N D U C E S

// Index
router.get("/", (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    if (err) console.log(err);
    res.render("authors/index.ejs", {
      authors: foundAuthors,
    });
  });
});

// New
router.get("/new", (req, res) => {
  res.render("authors/new.ejs");
});

// Delete
router.delete("/:id", (req, res) => {
  Author.findByIdAndRemove(req.params.id, () => {
    res.redirect("/authors");
  });
});

// Update
router.put("/:id", (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/authors");
  });
});

// Create
router.post("/", (req, res) => {
  Author.create(req.body, (err, createdAuthor) => {
    if (err) console.log(err)
    res.redirect("/authors");
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    if (err) console.log(err);
    res.render("authors/edit.ejs", {
      author: foundAuthor,
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    if (err) console.log(err);
    res.render("authors/show.ejs", {
      author: foundAuthor,
    });
  });
});

module.exports = router;
