const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key");
const requireLogin = require("../middleware/requireLogin");

router.post("/protected", requireLogin, (req, res) => {
  res.send("hello");
});

router.get("/", (req, res) => {
  res.send("hello");
});
router.get("/alluser", (req, res) => {
  User.find()
    .then((users) => {
      let userArray = users.map((user) => {
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
      });
      res.json({ users: userArray });
    })
    .catch((err) => {
      console.log("error in getAllPost is :", err);
    });
});

router.get("/getUserById", (req, res) => {
  User.findById(req.query.id, function (err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Result : ", user);
      const { _id, name, email, role } = user;
      res.json({ user: { _id, name, email, role } });
    }
  });
});
router.post("/deleteUser", (req, res) => {
  User.findById(req.body.id, function (err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (!user) {
        res.send({ message: "user not found" });
      } else if (user.role == "super Admin") {
        console.log("super admin");
        res.send({ message: "super admin can't be deleted" });
      } else {
        User.deleteOne(
          (user._id,
          (err, res) => {
            if (err) {
                console.log('find err')
              res.send({ message: err });
            } else {
                console.log('delete succc')
              res.send({ message: `${user.name} is deleted successfully` });
            }
          })
        );
      }
    }
  });
  // User.findByIdAndDelete(req.body.id, function (err, user) {
  //     if (err){
  //         console.log(err);
  //         res.send(err)
  //     }
  //     else{
  //         console.log("Result : ", user);
  //         const {_id,name,email,role}=user
  //         res.json({user:{_id, name, email,role}})
  //     }
  // });
});
router.post("/addUser", (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(422).json({ error: "please add all the field" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user already exist" });
      }
      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          role,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: `<b>${user.name}</b> added successfully` });
          })
          .catch((err) => {
            console.log("errpr", err);
          });
      });
    })
    .catch((err) => {
      console.log("errpr", err);
    });
});
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log("email is", email);
  console.log("password is", password);

  if (!email || !password) {
    return res.status(422).json({
      error: "email or password not provided",
    });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "email or password not match" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const { name, role, email, _id } = savedUser;
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            res.json({ token, user: { _id, name, role, email } });
          } else {
            res.status(422).json({ error: "email or password not match" });
          }
        })
        .catch((err) => {
          console.log("tag", err);
        });
    })
    .catch((err) => {
      console.log("tag", err);
    });
});
module.exports = router;
