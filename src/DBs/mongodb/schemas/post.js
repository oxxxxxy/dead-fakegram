//a draft
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author:mongoose.Schema.Types.ObjectId,
  sponsered:{//???????????????????????????????????????????????
    partnership:'businessAccountId',
  },//????????????????????????????
  typeOfPost:String,  //photo or gallery or shortVideo or longVideo
  /* content:,//????????????????????
    content:image??????? photo
    content:[image, image, image...]???????? gallery
    content:shortVideo/longVideo
  */
  creationTime: Date,
  post_liked_by:Array, //userIds
  added_user_likes:Array,//{userId,date}
  removed_user_likes:Array,//{userId,date}
  post_viewed_by:Array, //{userIds, date, duration}
  post_directed_by_and_for_who:Array,//{sender:userId, recipient:userId, date}
  post_bookmarked_by:Array,//userIds
  added_user_bookmarks:Array,//{userId,date}
  removed_user_bookmarks:Array,//{userId,date}
  post_geolocation:{title:String, coordinate:Array},//????????
  post_description:String,
  post_changes:Array,/*{
                          editedBy:userId,
                          date,
                          previous:{
                            post_description,
                            account_related_to_post_description,
                            tags_related_to_post_description,
                            analyzed_data_related_to_post_description
                            any variable condition and its dependencies
                          }
                      }*/
  post_comments:Array,/*{
                          removed:true/false,??????????????
                          reports:Array,//{userId, date}
                          commentId:Id,
                          date,
                          user:userId,
                          comment:String,
                          userLikes:Array//userIds,
                          replies:Array//{
                            removed:true/false,??????????????
                            reports:Array,//{userId, date}
                            commentId:Id,
                            date,
                            user:userId,
                            comment:String,
                            userLikes:Array//userIds,
                            replies:Array//and etc
                          }
                        }*/
  removed_post_comments:Array,/*{removedBy:userModeratorId,commentId:Id,date}*/
  reported_post_comments:Array,//{commentId:Id}
  post_reports:Array,//{userId, cause, date}
  account_related_to_post_description:Array,//[{accountText:string, segues:[{userId, date}]},  etc]????????????????
  tags_related_to_post_description:Array,//[{tagText:string, segues:[{userId, date}]}, etc]???????????????
  analyzed_data_related_to_post_description:Array,//[string, string, etc]????????????????????
  analyzed_data_related_to_post_comments:Array,//[string, string, etc]????????????????????
  analyzed_data_related_to_content:Array,//[string, string, etc]?????????????
  analyzed_data_related_to_post:Array,//[string, string, etc]????????????? user activity(likes, comments, bookmarks, time)
  tagged_accounts:Array,//{userid, coordinate, segues:Array, follow/unfollowAction}??????????
  //  removed:true/false,????????????????
  // post_condition:Array??????????????
  externalLink:{
    link:String,
    segues:Array//{userId, date}
  },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
