const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const brandSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  imgPath: String,
  isBrand: {type: Boolean, default: true}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
