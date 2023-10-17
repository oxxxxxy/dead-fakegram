var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  author:mongoose.Schema.Types.ObjectId,
  post_description:String,
  post_content_url:String,
  post_created:Number,
  post_likes:[],
  post_comments:[],
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
