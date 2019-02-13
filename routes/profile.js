const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');

router.get("/profile", ensureAuthenticated, (req, res) => {
  if (req.user.isBrand) {
    Product.find( {brand: req.user.name} )
    .then(products => {
      res.render("profile/profile", {"products": products});  
    }).catch(err => {
      console.log("The error has occurred", err);
    });
  } else {
    res.render("profile/profile", {"products": req.user.favorites});
    
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

router.post('/profile', uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url;
  //actualizamos la imagen del usuari
  User.findOneAndUpdate({_id: req.user._id}, { $set: { imgPath: imgPath }},{new:true})
  .then((updateUser) => {
    res.redirect("/profile");  
  })
  .catch(error => {
    console.log(error);
  })
  
});


module.exports = router;
