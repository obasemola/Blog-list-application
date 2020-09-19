const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});


module.exports = mongoose.model('Blog', blogSchema);