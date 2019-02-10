const express = require("express");
const router = express.Router();
const axios = require("axios");
const striptags = require('striptags');

router.get("/", (req, res, next) => {
  const url = "http://makeup-api.herokuapp.com/api/v1/products.json";
  axios.get(url)
    .then(response => {
      console.log(response.data);
      res.render("products/products", {"products": response.data});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const url = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`
  axios.get(url)
    .then(response => {
      console.log(response.data);
      product = response.data;
      product.description = striptags(product.description)
      res.render("products/product-detail", {"product": product});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
})




module.exports = router;
