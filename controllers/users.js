// Dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");

// I N D U C E S

// Index
router.get("/:name/family", (req, res) => {
  User.find({ family: { $in: [req.params.name] } }, function (err, foundUsers) {
    if (err) console.log(err);
    res.render("users/index.ejs", {
      users: foundUsers,
    });
  });
  res.send(req.params.name)
});

// New
router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// Delete
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, foundUser) => {
    const listIds = [];
    for (let i = 0; i < foundUser.lists.length; i++) {
      listIds.push(foundUser.lists[i]._id);
    }
    List.remove(
      {
        _id: {
          $in: listIds,
        },
      },
      (err, data) => {
        res.redirect("/users");
      }
    );
  });
});

// Update
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/users");
  });
});

// Create
router.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) console.log(err);
    res.redirect("/users");
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log(err);
    res.render("users/edit.ejs", {
      user: foundUser,
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log(err);
    res.render("users/show.ejs", {
      user: foundUser,
    });
  });
});

module.exports = router;
