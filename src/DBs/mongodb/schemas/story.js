//a draft
const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  author:mongoose.Schema.Types.ObjectId,
  creationTime:Date,
  //content:video/image?????
  sponsered:{//???????????????????????????????????????????????
    partnership:'businessAccountId',
    expand:Boolean
  },//??????????????????????
  story_views:Array,//{userIds, date, duration}
  story_directed_by_and_for_who:Array,//{sender:userId, recipient:userId, date}
  analyzed_data_related_to_content:Array,//[string, string, etc]?????????????
  analyzed_data_related_to_story:Array,//[string, string, etc]????????????? user activity
  messages_replied_to_story:Array,/*{
    userId,
    message:String
  }*/
  story_reports:Array,//{userId, cause, date}
  interactive:{},/*
    {
      type:'rate',
      coordinate:{x,y},
      rotation:degrees,
      emoji:unicode
      rating:Array//{userId, rate, date}
    }
    {
      type:'ChoiceQuestion',
      coordinate:{x,y},
      rotation:degrees,
      question:String
      option1:{text:String, answers: Array,//{userId, date}}
      option2:{text:String, answers: Array//{userId, date}}
    }
    {
      type:'quiz',
      coordinate:{x,y},
      rotation:degrees,
      question:String
      option1:{text:String, answers: Array,//{userId, date}}
      option2:{text:String, answers: Array//{userId, date}}
      ...oprionN
    }
    {
      type:'question',
      coordinate:{x,y},
      rotation:degrees,
      question:String
      answers:Array//{userId, date, message}
    }
  */
  pinned:Array,/*
    {
      type:'geolocation',
      geolocation:{placeName,[geo]}
      coordinate:{x,y},
      rotation:degrees,
      text:String,
      segues:Array//{userId, date}
    },
    {
      type:'account',
      coordinate:{x,y},
      rotation:degrees,
      text:String,
      segues:Array//{userId, date}
    },
    {
      type:'post',
      coordinate:{x,y},
      rotation:degrees,
      postId:id,
      segues:Array//{userId, date}
    }
    {
      type:'story',
      coordinate:{x,y},
      rotation:degrees,
      storyId:id,
      segues:Array//{userId, date}
    }
    {
      type:'link',
      coordinate:{x,y},
      rotation:degrees,
      text:String,
      segues:Array//{userId, date}
    }
    {
      type:'tag',
      coordinate:{x,y},
      rotation:degrees,
      text:String,
      segues:Array//{userId, date}
    }
  */
  externalLink:{
    link:String,
    segues:Array//{userId, date}
  },
  usedFilter:mongoose.Schema.Types.ObjectId,//customFilterId????????????????
  //  removed:true/false,????????????????
  // post_condition:Array??????????????
});

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;
