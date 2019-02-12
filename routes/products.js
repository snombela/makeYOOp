const express = require("express");
const router = express.Router();
const striptags = require('striptags');
const Product = require("../models/Product")
const uploadCloud = require('../config/cloudinary.js');

router.get("/", (req, res, next) => {
    Product.find({})
    .then(products => {
      res.render("products/products", {"products": products});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});
router.get("/new", (req, res, next) => {
  res.render("products/newproduct")
})

router.post("/new", (req, res, next) => {
  console.log('POST NEW')
  const { brand, name, price, image_link, description, category, product_type, tag_list, product_colors, imgPath, imgName } = req.body;
  const newProduct = new Product({brand, name, price, image_link, description, category, product_type, tag_list, product_colors, imgPath, imgName });
  // const imgPath = req.file.url;
  // const imgName = req.file.originalname;
  console.log(newProduct)
    newProduct.save()
    .then((product) => {
      //console.log(product)
      res.redirect("/products")
    })
    .catch((error) => {
      console.log(error)
  })
})


router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      product.description = striptags(product.description) //Quitar etiquetas html a la descripción
      res.render("products/product-detail", {"product": product});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});


//uploadCloud.single('photo'), 

module.exports = router;

