// Dependencies
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/list");
const bcrypt = require("bcrypt");

// I N D U C E S

const shuffle = (array) => {
  array.sort((a, b) => 0.5 - Math.random());
}

const randomDrawing = (familyArray) => {
  let family = familyArray.map((item)=> item )
  shuffle(family)
  for (let i in familyArray) {
    if (familyArray[i] === family[i]) {
      randomDrawing(family)
    }
  }
  return family
}

// Secret Santa Randomizer
router.get("/secretsanta", async (req, res) => {
  const foundUsers = await User.find({});
  const shuffled = randomDrawing(foundUsers)
  const familyArray = []
  for (let i in foundUsers) {
    foundUsers[i].giftee = shuffled[i].name
    await foundUsers[i].save();
    familyArray.push({ [foundUsers[i].name] : shuffled[i].name })
  }
  res.send(familyArray)
});

// Index
router.get("/", async (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.render("users/index.ejs", {
      family: foundUsers,
      currentUser: req.session.currentUser,
    });
  })
});

// New
router.get("/new", (req, res) => {
  res.render("users/new.ejs", {
    currentUser: req.session.currentUser,
  });
});

// Delete
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, foundUser) => {
    if (err) console.log(err);
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
        res.redirect("/");
      }
    );
  });
});

// Update
router.put("/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
  if (err) console.log(err);
  req.body.password = req.body.password ? bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) : user.password
  User.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) console.log(err);
      res.redirect("/users");
    });
  })
});

// Create
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    if (err) console.log(err);
    req.session.currentUser = createdUser;
    res.redirect("/users");
  });
});

// Edit
router.get("/:id/edit", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.render("users/edit.ejs", {
      user,
      currentUser: req.session.currentUser,
    });
  });
});

// Show
router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) console.log(err)
    res.render("users/show.ejs", {
      user,
      currentUser: req.session.currentUser,
    });
  })
});

module.exports = router;
