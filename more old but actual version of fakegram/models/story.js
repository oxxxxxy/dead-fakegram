var mongoose = require('mongoose');

var StorySchema = new mongoose.Schema({
  author:mongoose.Schema.Types.ObjectId,
  story_url:String,
  story_desc:String,
  story_created:Date,
});

var Story = mongoose.model('Story', StorySchema);
module.exports = Story;
