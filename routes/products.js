const express = require("express");
const router = express.Router();
const striptags = require('striptags');
const Product = require("../models/Product")

router.get("/", (req, res, next) => {
    Product.find({})
    .then(products => {
      res.render("products/products", {"products": products});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});

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

//Crear nuevo producto aquí 
/*router.get("/new"){
  render(product/new)
}

Guardar producto
/products tipo post
router.post("/", (....)) {
  me guardo el producto en la db
}*/




module.exports = router;
