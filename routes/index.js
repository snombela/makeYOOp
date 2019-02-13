const express = require('express');
const router  = express.Router();
const Product = require('../models/Product')

/* GET home page */
router.get('/', (req, res, next) => {
  Product.find({}).limit(12)
    .then(products => {
      res.render("index", { "products": products });
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});

module.exports = router;
