const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Brand = require("../models/Brand")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  console.log(req.flash("error"))
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/signup/:role", (req, res, next) => {
  const role = req.params.role;
  console.log(role) 
  res.render("auth/signup", {
    role: role
  });
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  console.log(username)
  console.log(email)
  console.log(password)
  console.log(role)

  //const {username, email, password, role} = req.params
  console.log(role)
  if (email === "" || password === "" || username === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }
if (role === "user"){
  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
} else if (role === "brand"){
  Brand.findOne({ email }, "email", (err, brand) => {
    if (brand !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newBrand = new Brand({
      username,
      email,
      password: hashPass
    });

    newBrand.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
}

});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
