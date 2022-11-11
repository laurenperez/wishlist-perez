// Dependencies
const express = require("express");
const router = express.Router();
const List = require("../models/list");
const Gift = require("../models/gift");

// I N D U C E S

// Index
router.get("/", (req, res) => {
  List.find({}, (err, foundLists) => {
    if (err) console.log(err);
    res.render("lists/index.ejs", {
      lists: foundLists,
    });
  });
});

// New
router.get("/new", (req, res) => {
  res.render("lists/new.ejs");
});

// Delete
router.delete("/:id", (req, res) => {
  List.findByIdAndRemove(req.params.id, (err, foundList) => {
    const giftIds = [];
    for (let i = 0; i < foundList.gifts.length; i++) {
      giftIds.push(foundList.gifts[i]._id);
    }
    Gift.remove(
      {
        _id: {
          $in: giftIds,
        },
      },
      (err, data) => {
        res.redirect("/lists");
      }
    );
  });
});

// Update
router.put("/:id", (req, res) => {
  List.findByIdAndUpdate(req.params.id, req.body, () => {
    res.redirect("/lists");
  });
});

// Create
router.post("/", (req, res) => {
  console.log(req.body)
  List.create(req.body, (err, createdList) => {
    if (err) console.log(err);
    res.redirect("/lists");
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  List.findById(req.params.id, (err, foundList) => {
    if (err) console.log(err);
    res.render("lists/edit.ejs", {
      list: foundList,
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  List.findById(req.params.id, (err, foundList) => {
    if (err) console.log(err);
    res.render("lists/show.ejs", {
      list: foundList,
    });
  });
});

module.exports = router;
