// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const axios = require("axios");

mongoose
  .connect("mongodb://localhost/makeyoop", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Product.collection.drop();

const url = "http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Natural&product_type=blush";
//const url = "http://makeup-api.herokuapp.com/api/v1/products.json"
axios.get(url)
  .then(response => {

    Product.create(response.data)
    .then(products=> {
      console.log(`Created ${products.length} products`);
      mongoose.disconnect();
    }).catch(err => {
      console.log(err);
      mongoose.disconnect();
    })
  }).catch(err => {
    console.log("The error has occurred", err);
    mongoose.disconnect();
  });