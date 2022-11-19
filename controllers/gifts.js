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
router.get("/new/:listId", (req, res) => {
  List.findById(req.params.listId, (err, list) => {
    res.render("gifts/new.ejs", {
      currentUser: req.session.currentUser,
      list,
    });
  });
});

// Delete
router.delete("/:id", (req, res) => {
  Gift.findByIdAndRemove(req.params.id, (err, foundGift) => {
    List.findOne({ "gifts._id": req.params.id }, (err, list) => {
      list.gifts.id(req.params.id).remove();
      list.save((err, data) => {
        res.redirect(`/lists/${list._id}`);
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
      List.findOne({ "gifts._id": req.params.id }, (err, list) => {
        list.gifts.id(req.params.id).remove();
        list.gifts.push(updatedGift);
        list.save((err, data) => {
          res.redirect(`/lists/${list._id}`);
        });
      });
    }
  );
});

// Purchase Update
router.post("/purchased/:id", async (req, res) => {
  const gift = await Gift.findById(req.params.id);
  gift.purchased = !gift.purchased;
  await gift.save();
  List.findOne({ "gifts._id": req.params.id }, (err, list) => {
    list.gifts.id(req.params.id).remove();
    list.gifts.push(gift);
    list.save((err, data) => {
      res.redirect(`/lists/${list._id}`);
    });
  });
});

// Create
router.post("/:listId", (req, res) => {
  if ( req.body.imageUrl[0] !== "h" ) req.body.imageUrl = "/img/gifts.jpg";
  List.findById(req.params.listId, (err, list) => {
    req.body.owner = list.owner;
    Gift.create(req.body, (err, createdGift) => {
      //req.body.listId is ignored due to Schema
      list.gifts.push(createdGift);
      list.save((err, data) => {
        res.redirect(`/lists/${list._id}`);
      });
    });
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  Gift.findById(req.params.id, (err, gift) => {
    List.find({}, (err, allLists) => {
      List.findOne({ "gifts._id": req.params.id }, (err, list) => {
        res.render("gifts/edit.ejs", {
          gift,
          allLists,
          list,
        });
      });
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  Gift.findById(req.params.id, (err, gift) => {
    List.findOne({ "gifts._id": req.params.id }, (err, list) => {
      res.render("gifts/show.ejs", {
        list,
        gift,
      });
    });
  });
});

module.exports = router;
