const mongoose = require('mongoose');

const UserPostsSchema = new mongoose.Schema({
  owner:{
    type: String
    ,required: true
  }
  ,posts:{
    type: Array
  }
});
const UserPosts = mongoose.model('UserPosts', UserPostsSchema);
module.exports = UserPosts;
