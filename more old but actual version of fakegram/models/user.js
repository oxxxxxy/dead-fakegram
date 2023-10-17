const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  userNumber: Number
  ,email: {
    type: String
  }
  ,mobileNumber:{
    type:String
  }
  ,fullName:{
    type:String
  }
  ,username: {
    type: String
  }
  ,usernameUrlPath: {
    type: String
  }
  ,password: {
    type: String
  }
  ,userCreated:{
    type:Date
    ,default:Date.now
  }
  ,userInterimContentLayer: {
    number: Number
    ,objectId: mongoose.Schema.Types.ObjectId
  }
  ,userChangeDates: {
    number: Number
    ,objectId: mongoose.Schema.Types.ObjectId
  }
  ,UserPreviousData: {
    number: Number
    ,objectId: mongoose.Schema.Types.ObjectId
  }

  ,user_description:{
     type:String
     ,default:''
  }
  ,userCurrentProfilePicture: {
    type: String
  }
  ,userLastStory:mongoose.Schema.Types.ObjectId

  ,previousFullNames:[
    {type: String}
  ]
  ,previousUsernames:[
    {type: String}
  ]
  ,previousUsernamesUrlPaths:[
    {type: String}
  ]
  ,previousUserDescriptions:[
    {type: String}
  ]
  ,previousUserProfPic:[
    {type: String}
  ]



  ,user_activity:[]
  ,user_posts:[]
  ,user_stories:[]
  ,user_followers:[]
  ,user_following:[]
});

UserSchema.statics.authenticate = (emailOrNumberOrUsername, password, callback) => {
  User.findOne(emailOrNumberOrUsername)
  .exec((err, user) => {
    if (err) {
      return callback(err)
    }

    if (!user) {
      const err = new Error('User not found.');
      err.status = 404;
      return callback(err);
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return callback(null, user);
      } else {
        return callback(err);
      }
    })
  });
}

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
