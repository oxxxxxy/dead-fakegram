//draft
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  previous_emails:Array,//{email, dateOfChange}

  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  previous_usernames:Array,//{username, dateOfChange}

  password: {
    type: String,
    required: true,
  },
  previous_passwords:Array,//{email, dateOfChange}

  creationTime:{
   type:Date,
   default:Date.now
  },

  profile_description:{
   type:String,
   default:""
  },
  previous_profile_description:Array,//{description, date}
  profile_picture:{//??????????
   image:'image',
   date:Date
  },
  previous_profile_pictures:Array,//{prof_pic, date}

  isAccountPrivate:{
    type:Boolean,
    default:false
  },
  isAccountBusiness:{
    type:Boolean,
    default:false
  },

  dialogues:Array,// {with:userId, dialogueId:'id'}

  followers:Array,//userIds
  added_followers:Array,//{userId, date}
  former_followers:Array,//{userId, date}
  following:Array,//userIds
  added_following:Array,//{userId, date}
  former_following:Array,//{userId, date}
  blocked_accounts:Array,//userIds
  added_blocks:Array,//{userId, date}
  former_blocks:Array,//{userId, date}
  is_blocked_from_other_users:Array,//userIds
  was_blocked_from_other_users:Array,//{userId, date}
  was_unblocked_from_other_users:Array,//{userId, date}

  created_stories:Array,//{storyId, date}
  viewed_stories:Array,//{storyId, date, duration}
  directed_stories_by_and_for_who:Array,//{storyId, recipient:userId, date}
  replied_messages_to_story:Array,//{storyId, date, message}
  interactions_with_stories:Array,//{storyId, date}
  segues_via_pinned:Array,//{storyId, date}
  reported_stories:Array,//{storyId, cause, date}

  created_posts:Array,//{postId, date}
  changed_posts:Array,//{postId, date}
  reported_post:Array,//{postId, cause, date}
  reported_post_comments:Array,//{commentId, d          ate, isCommentatorBlocked}
  liked_posts:Array,//{postId}
  added_post_likes:Array,//{postId,date}
  removed_post_likes:Array,//{postId,date}
  viewed_posts:Array,//{postId, date, duration}
  commented_posts:Array,//{postId, commentId, date}
  directed_posts:Array,//{postId, recipient:userId, date}
  shared_posts:Array,//{postId, date}
  bookmarked_posts:Array,//{postId, date}
  added_bookmarked_posts:Array,//{postId,date}
  removed_bookmarked_posts:Array,//{postId,date}

  viewed_tags:Array,//{string, date}???????


  user_analyticsId:'id',
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
