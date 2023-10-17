const mongoose = require('mongoose');

const AllCountsSchema = new mongoose.Schema({
  users : {
    type: Number
    ,default: 0
  }
  ,posts : {
    type: Number
    ,default: 0
  }
  ,stories : {
    type: Number
    ,default: 0
  }
  ,usersPostsHolders : {
    type: Number
    ,default: 0
  }
  ,usersStoriesHolders : {
    type: Number
    ,default: 0
  }
  ,posts : {
    type: Number
    ,default: 0
  }
  ,posts : {
    type: Number
    ,default: 0
  }
  ,posts : {
    type: Number
    ,default: 0
  }
});

const AllCounts = mongoose.model('AllCounts', AllCountsSchema);
module.exports = AllCounts;
