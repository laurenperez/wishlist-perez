// Dependencies
const express = require("express");
const router = express.Router();
const Gift = require("../models/gift");
const List = require("../models/list");

// I N D U C E S

// Index
router.get("/", (req, res) => {
  Gift.find({}, (err, foundGifts) => {
    if (err) console.log(err);
    res.render("gifts/index.ejs", {
      gifts: foundGifts,
    });
  });
});

// New
router.get("/new", (req, res) => {
  List.find({}, (err, allLists) => {
    res.render("gifts/new.ejs", {
      lists: allLists,
    });
  });
});

// Delete
router.delete("/:id", (req, res) => {
  Gift.findByIdAndRemove(req.params.id, (err, foundGift) => {
    List.findOne({ "gifts._id": req.params.id }, (err, foundList) => {
      foundList.gifts.id(req.params.id).remove();
      foundList.save((err, data) => {
        res.redirect("/gifts");
      });
    });
  });
});

// Update
router.put("/:id", (req, res) => {
  Gift.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedGift) => {
      List.findOne({ "gifts._id": req.params.id }, (err, foundList) => {
        if (foundList._id.toString() !== req.body.listId) {
          foundList.gifts.id(req.params.id).remove();
          foundList.save((err, savedFoundList) => {
            List.findById(req.body.listId, (err, newList) => {
              newList.gifts.push(updatedGift);
              newList.save((err, savedNewList) => {
                res.redirect("/gifts/" + req.params.id);
              });
            });
          });
        } else {
          foundList.gifts.id(req.params.id).remove();
          foundList.gifts.push(updatedGift);
          foundList.save((err, data) => {
            res.redirect("/gifts/" + req.params.id);
          });
        }
      });
    }
  );
});

// Create
router.post("/", (req, res) => {
  List.findById(req.body.listId, (err, foundList) => {
    Gift.create(req.body, (err, createdGift) => {
      //req.body.listId is ignored due to Schema
      foundList.gifts.push(createdGift);
      foundList.save((err, data) => {
        res.redirect("/gifts");
      });
    });
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  Gift.findById(req.params.id, (err, foundGift) => {
    List.find({}, (err, allLists) => {
      List.findOne({ "gifts._id": req.params.id }, (err, foundGiftList) => {
        res.render("gifts/edit.ejs", {
          gift: foundGift,
          lists: allLists,
          giftList: foundGiftList,
        });
      });
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  Gift.findById(req.params.id, (err, foundGift) => {
    List.findOne({ "gifts._id": req.params.id }, (err, foundList) => {
      res.render("gifts/show.ejs", {
        list: foundList,
        gift: foundGift,
      });
    });
  });
});

module.exports = router;
