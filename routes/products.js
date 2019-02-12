const express = require("express");
const router = express.Router();
const striptags = require("striptags");
const Product = require("../models/Product");

router.get("/", (req, res, next) => {
    Product.find({})
    .then(products => {
      //Aqui tenemos un JSON con todos los datos de todos los productos
      //llamamos a funcion --> var misfiltro=getFilters(products) --> nos va a devolver un objeto con los
      //datos a pintar en los filtros

      res.render("products/products", {"products": products});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});

// router.get("/:id", (req, res, next) => {
//   const id = req.params.id;
//   Product.findById(id)
//     .then(product => {
//       product.description = striptags(product.description) //Quitar etiquetas html a la descripción
//       res.render("products/product-detail", {"product": product});
//     })
//     .catch(err => {
//       console.log("The error has occurred", err);
//     });
// });

router.get("/brands", (req, res, next) => {
  Product.find({})
    .then(products => {
      var brands = []
      
      products.forEach(function(product) {
        return brands.push(product.brand)
      });

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index && value !== null;
      }

      res.json(brands.filter(onlyUnique));
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

/*function getfilters(producstos) 
 var color=[];
 var name =[];
 foreach()=>{
   push
 }
 quitas repetidos
 return filter={
   color:color,
   name:name
 }
*/

// function getFilters(products){
//   var brands = [];
//   var names = [];
//   var prices = [];
//   var categories = [];
//   var product_types = [];
//   var tags_list = [];
//   var products_colors = [];

// products.forEach(product => {
//   brands.push(product.brand)
//   });
//   var uniq_brands = brands.filter(function(brand, index, brands) {
//   return brands.indexOf(brand) === index;
// })

// products.forEach(product => {
//   names.push(product.name)
// });
// var uniq_names = names.filter(function(name, index, names) {
// return names.indexOf(name) === index;
// })

// products.forEach(product => {
//   prices.push(product.price)
// });

// products.forEach(product => {
//   categories.push(product.category)
// });
// var uniq_categories = categories.filter(function(category, index, categories ) {
// return categories.indexOf(category) === index;
// })

// products.forEach(product => {
//   categories.push(product.category)
// });
// var uniq_categories = categories.filter(function(category, index, categories ) {
// return categories.indexOf(category) === index;
// })

// }

module.exports = router;
