const express = require("express");
const router = express.Router();
const Product = require("../models/Product")

router.get("/profile", ensureAuthenticated, (req, res) => {
  if (req.user.isBrand) {
    Product.find( {brand: req.user.name} )
    .then(products => {
      res.render("profile/profile", {"products": products, "user": req.user});  
    }).catch(err => {
      console.log("The error has occurred", err);
    });
  } else {
    res.render("profile/profile", {"products": req.user.favorites, "user": req.user});
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
