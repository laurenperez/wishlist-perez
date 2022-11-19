// Dependencies
const express = require("express");
const router = express.Router();
const List = require("../models/list");
const Gift = require("../models/gift");
const User = require("../models/user");

// I N D U C E S

// Index
// router.get("/", (req, res) => {
//   List.find({}, (err, foundLists) => {
//     if (err) console.log(err);
//     res.render("lists/index.ejs", {
//       lists: foundLists,
//     });
//   });
// });

// New
router.get("/new", (req, res) => {
  res.render("lists/new.ejs", { currentUser: req.session.currentUser });
});

// Delete
router.delete("/:id", (req, res) => {
  List.findByIdAndRemove(req.params.id, (err, foundList) => {
    User.findOne({ "lists._id": req.params.id }, (err, foundUser) => {
      foundUser.lists.id(req.params.id).remove();
      foundUser.save((err, data) => {
        const giftIds = [];
        for (let gift of foundList.gifts) {
          giftIds.push(gift._id);
        }
        Gift.remove({ _id: { $in: giftIds } }, (err, data) => {
          res.redirect(`/users/${req.session.currentUser._id}`);
        });
      });
    });
  });
});

// Update
router.put("/:id", (req, res) => {
  List.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedList) => {
      User.find({ "lists._id": req.params.id }, (err, user) => {
        user = user[0];
        user.lists.id(req.params.id).remove();
        user.lists.push(updatedList);
        user.save((err, data) => {
          res.redirect(`/lists/${req.params.id}`);
        });
      });
    }
  );
});

// Create
router.post("/", (req, res) => {
  User.findById(req.session.currentUser._id, (err, user) => {
    if (err) console.log(err);
    req.body.owner = user._id;
    List.create(req.body, (err, createdList) => {
      if (err) console.log(err);
      user.lists.push(createdList);
      user.save((err, data) => {
        res.redirect(`/lists/${createdList._id}`);
      });
    });
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  List.findById(req.params.id, (err, foundList) => {
    if (err) console.log(err);
    res.render("lists/edit.ejs", {
      list: foundList,
      currentUser: req.session.currentUser
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  List.findById(req.params.id, (err, list) => {
    if (err) console.log(err);
    User.findById(list.owner, (err, user) => {
      if (err) console.log(err);
      res.render("lists/show.ejs", {
        currentUser: req.session.currentUser,
        list,
        user
      })
    });
  });
});

module.exports = router;
