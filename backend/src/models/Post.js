/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
  liked: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);
