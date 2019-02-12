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
  let colorObj={
    arrayProp:[]
  }
  Product.find({})
  .then(products => {
    products.forEach(item => {
      if(item.product_colors.length>0){
        item.product_colors.forEach(colorsArray=>{
          //console.log(colorsArray.colour_name,colorsArray.hex_value)
         // colorObj.name.push(colorsArray.colour_name)
         // colorObj.hex.push(colorsArray.hex_value)
          actualObj={
            name:colorsArray.colour_name,
            hex:colorsArray.hex_value
          }
          colorObj.arrayProp.push(actualObj);
        })
      }
    })
    console.log(colorObj)
    res.render("products/newproduct", {"colors":colorObj})
  })
})

router.post("/new", uploadCloud.single('photo'), (req, res, next) => {
  console.log('POST NEW')
  const { brand, name, price, image_link, description, category, product_type, tag_list, product_colors} = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newProduct = new Product({brand, name, price, image_link, description, category, product_type, tag_list, product_colors, imgPath, imgName });
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


//

module.exports = router;

