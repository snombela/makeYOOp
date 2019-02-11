const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Brand = require("../models/Brand");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  console.log(req.flash("error"));
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup/:role", (req, res, next) => {
  const role = req.params.role;
  console.log(role);
  res.render("auth/signup", {
    role: role
  });
});

router.post("/signup", (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (email === "" || password === "" || name === "") {
    res.render("auth/signup", { message: "Indicate email, password and name" });
    return;
  }
  if (role === "user") {
    registerUser({ name, email, password, role }, res);
  } else if (role === "brand") {
    registerBrand({ name, email, password, role }, res);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

function registerUser({ name, email, password, role }, res) {
  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup/user", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup/user", { message: "Something went wrong" });
      });
  });
}

function registerBrand({ name, email, password, role }, res) {
  Brand.findOne({ email }, "email", (err, brand) => {
    if (brand !== null) {
      res.render("auth/signup/brand", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newBrand = new Brand({
      name,
      email,
      password: hashPass
    });

    newBrand
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup/brand", { message: "Something went wrong" });
      });
  });
}

module.exports = router;
