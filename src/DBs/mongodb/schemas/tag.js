//a first draft
const mongoose = require('mongoose');

const PatternSchema = new mongoose.Schema({
  creationTime:Date,
  author:mongoose.Schema.Types.ObjectId,//userId
  moderation:{someInfo:Array, moderator:'moderId'},//???????????
  suggested:Boolean,//???????????
  posts:Array,//added posts by queue postIds
  segues:Array,//{userId, date}
  rated_posts_indexes:Array,//rated posts above [56, 6665, etc]
  analyzed_data_related_to_tag:{someStats1:Array,someStats2:Array},//?????????????
});

const Pattern = mongoose.model('Pattern', PatternSchema);
module.exports = Pattern;
