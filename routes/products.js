const express = require("express");
const router = express.Router();
const striptags = require('striptags');
const Product = require("../models/Product")
const User = require("../models/User")
const uploadCloud = require('../config/cloudinary.js');

router.get("/", (req, res, next) => {
  Product.find({})
    .then(products => {
      if (req.user != undefined){
        products = products.map(product => {
          const isFavorite = req.user.favorites.filter(favorite => {
            return favorite._id.equals(product._id) //comparamos un id con otro para ver si está en favoritos.
          }).length > 0;
          product.isFavorite = isFavorite; 
          return product;
        })
      }
      res.render("products/products", {"products": products, "user": req.user});
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
  req.query.brand
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

router.post("/categoriesFiltered", (req, res, next) => {
  var allcategoriesArr = req.body.categoryArr  
  Product.find({'category':{$in:[allcategoriesArr]} })
    .then(products => {
      res.json(products);
      // console.log("productsXXXX")
      // console.log(products)
      //res.render("products/products", {"products": products, "user": req.user});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });

})

router.post("/brandsFiltered", (req, res, next) => {
  var allBrandsArr = req.body.brandArr  
  Product.find({'brand':{$in:[allBrandsArr]} })
    .then(products => {
      res.json(products);
      // console.log("productsXXXX")
      // console.log(products)
      //res.render("products/products", {"products": products, "user": req.user});
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });

})


router.get("/names", (req, res, next) => {
  Product.find({})
    .then(products => {
      var names = []
      
      products.forEach(function(product) {
        return names.push(product.name)
      });

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index && value !== null;
      }

      res.json(names.filter(onlyUnique));
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});


router.get("/categories", (req, res, next) => {
  Product.find({})
    .then(products => {
      var categories = []
      products.forEach(function(product) {
        return categories.push(product.category)
      });
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index && value !== null;
      }
      res.json(categories.filter(onlyUnique));
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});

router.get("/product_types", (req, res, next) => {
  Product.find({})
    .then(products => {
      var product_types = []
      
      products.forEach(function(product) {
        return product_types.push(product.product_type)
      });

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index && value !== null;
      }

      res.json(product_types.filter(onlyUnique));
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});

router.get("/products_colors", (req, res, next) => {
  Product.find({})
    .then(products => {
      var products_colors = []
      
      products.forEach(function(product) {
        return products_colors.push(product.product_colors)
      });

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index && value !== null;
      }

      res.json(products_colors.filter(onlyUnique));
    });
  })

router.get("/new", isBrand, (req, res, next) => {
  let colorObj={
    arrayProp:[]
  }

  let tag = []
  Product.find({})
  .then(products => {
    products.forEach(item => {
      if(item.product_colors.length > 0){
        item.product_colors.forEach(colorsArray=>{
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
  const { name, price, description, category, product_type, tag_list, product_colors} = req.body;
  const image_link = req.file.url;
  const imgName = req.file.originalname;
  const newProduct = new Product({
    brand: req.user.name, 
    name, 
    price, 
    image_link, 
    description, 
    category, 
    product_type, 
    tag_list: tag_list.split(','), 
    product_colors, 
    image_link, 
    imgName });
  console.log(newProduct)
    newProduct.save()
    .then((product) => {
      res.redirect("/products")
    })
    .catch((error) => {
      console.log(error)
  })
})

router.get("/favorite/add/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      User.update( {_id: req.user._id}, 
      {$push: {favorites: product} })
      .then(() => {
        res.redirect(req.headers.referer) //actualiza la url de donde vienes.
      })
      .catch(err => {
        console.log("The error has occurred", err);
      });
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});


router.get("/prices", (req, res, next) => {
  Product.find({})
    .then(products => {
      var prices = []
      
      products.forEach(function(product) {
        return prices.push(product.price)
      });

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index && value !== null;
      }

      res.json(prices.filter(onlyUnique));
})
});

router.get("/favorite/remove/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(product => {
      User.update( {_id: req.user._id}, 
      {$pull: {favorites: product} })
      .then(() => {
        res.redirect(req.headers.referer) //actualiza la url de donde vienes.
      })
      .catch(err => {
        console.log("The error has occurred", err);
      });
    })
    .catch(err => {
      console.log("The error has occurred", err);
    });
});


router.get("/productsByPrice/:price", (req, res, next) => {
  console.log(req.params.price)
  //Cambio
  Product.find()
    .then(products => {
      res.json(products.filter(product => product.price <= req.params.price && product.price !== null && product.price !== 0));
})
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

function isBrand(req, res, next) {
  if (req.isAuthenticated() && req.user.isBrand) {
    return next();
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
