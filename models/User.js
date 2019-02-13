const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  imgPath: {type: String, default: "https://res.cloudinary.com/dasjwsmzb/image/upload/v1550057973/folder-name/user.png"},
  isBrand: {type: Boolean, default: false},
  favorites: Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
