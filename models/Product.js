const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  brand: String,
  name: String,
  price: Number,
  price_sign: String,
  image_link: String,
  product_link: String,
  description: String,
  category: String,
  product_type: String,
  tag_list: [String],
  product_colors: Array,
  imgName: String,
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

