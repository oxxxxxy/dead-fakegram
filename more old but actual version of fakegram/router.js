const path = require('path');
const express = require('express');

const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const multer=require('multer');

const CONFIG = require('./config');
const User = require('./models/user');
const Post = require('./models/post');
const Story = require('./models/story');
const Authentication = require('./routes/authenticationRoute');
const Newsfeed = require('./routes/mainRoute');
const Explore = require('./routes/exploreRoute');
const Profile = require('./routes/profileRoute');
const Activity = require('./routes/activityRoute');

const TEMPLATES_PATH = path.join(__dirname, '..', 'templates');

const router = express.Router();
const uploadHandler = multer();


cloudinary.config({
  cloud_name: CONFIG.cloudinary.cloud_name,
  api_key: CONFIG.cloudinary.api_key,
  api_secret: CONFIG.cloudinary.api_secret
});

router.get('/accounts/signup', Authentication.signupPage);
router.get('/accounts/login', Authentication.loginPage);
router.post('/accounts/signup', Authentication.signup);
router.post('/accounts/login', Authentication.login);
router.get('/accounts/logout', Authentication.logout);
router.get('/accounts/guest', Authentication.guest);

router.get('/', Newsfeed.index);

router.get('/explore', Explore.index);

router.get('/activity', Activity.index);

router.get('/:name', Profile.index);







/*
router.post('/', function (req, res, next) {
  if(req.body.maestro){
    User.authenticate("ne_deshovka@super.natural", "hardpassword123", function (error, user) {       //("maestro_email", "maestro_password",
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
    return;
  }

  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
});
router.get('/', function (req, res, next) {// check
  User.findById(
    req.session.userId
  ).exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.sendFile(path.join(TEMPLATES_PATH + '/registration.html'));
        //return res.redirect('/authentication');
      } else {
        return res.sendFile(path.join(TEMPLATES_PATH + '/main.html'));
        // let userContainer=Object.assign({},user._doc);
        // return res.json({username:userContainer.username
        //   ,user_prof_pic:userContainer.user_prof_pic
        //   ,userId:userContainer._id
        //   ,user_following:userContainer.user_following});
      }
    }
  });
});
router.get('/authentication', function (req, res, next) {
  return res.sendFile(path.join(TEMPLATES_PATH + '/authentication.html'));
});
router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/authentication');
      }
    });
  }
});
*/
/*shat by me*/
/*
router.get('/parts', function (req, res, next) {
  return res.sendFile(__dirname + `/public/parts/${req.headers.page_part}`);
});

router.get('/data',(req, res, next)=>{
  let need=req.headers["need"];
  if(need==1){
    sendUserSuggestion(res);
  }else{
    let id=(function(){if(req.headers["almostlinkid"]!="undefined"){return req.headers["almostlinkid"];}return req.session.userId;}());
    User.findById(id, (err, user)=> {
      if (err){
        console.log("ERROR: User.findById 53", err);
      }else{
        if(need==0){
          let usersArr=[user._id];
          sendUserFeed(usersArr.concat(user.user_following), res);
        }else if(need==4){
          sendUserProfile(user, res);
        }else if(need==3){
          sendUserActivity(user.user_activity, res);
        }else{
          res.json({system:"♂ Hey buddy, I think you got the wrong headers[\"need\"] part. The inattentive club is two blocks down. ♂"});
        }
      }
    });
  }
});
function sendUserFeed(usersIdsArr, res){
  let container={
    usersIds:usersIdsArr
    ,hasData:false
    ,posts:[]
    ,stories:[]
    ,users:[]
  }
  ,usersPostsIds=[], usersStoriesIds=[];
  function findUsersDataIds(i){
    if(i>=0){
      User.findById(usersIdsArr[i], (err, user)=> {
        if (err){
          console.log("ERROR: findUsersDataIds", err);
        }else{
          if(user.user_posts.length>=1||user.user_last_story!=undefined){
            let userParts={
              id:user._id
              ,prof_pic:user.user_prof_pic
              ,username:user.username
              ,posts:user.user_posts
            };
            container.users.push(userParts);
            usersPostsIds=usersPostsIds.concat(user.user_posts);
            if(user.user_last_story){
              usersStoriesIds.push(user.user_last_story);
            }
          }
          if(i==0){
            if(container.users.length>0){
              container.hasData=true;
              findUsersPostsAndStoriesAndSend(usersPostsIds.length-1, usersStoriesIds.length-1, usersPostsIds, usersStoriesIds, container, res);
            }else{
              res.json(container);
            }
          }
          findUsersDataIds(i-1);
        }
      });
    }
  }
  findUsersDataIds(usersIdsArr.length-1);
}
function sendUserProfile(userProf, res){
  let container={
    hasData:false
    ,posts:[]
    ,stories:[]
    ,id:userProf._id
    ,username:userProf.username
    ,description:userProf.user_description
    ,prof_pic:userProf.user_prof_pic
    ,followers:userProf.user_followers
    ,following:userProf.user_following
    ,email:userProf.email
  }, postsIds=userProf.user_posts ,storiesIds=userProf.user_stories;
  if(postsIds.length>0||storiesIds.length>0){
    container.hasData=true;
    findUsersPostsAndStoriesAndSend(postsIds.length-1, storiesIds.length-1, postsIds, storiesIds, container, res);
  }else{
    res.json(container);
  }
}
function findUsersPostsAndStoriesAndSend(pl, sl, uPI, uSI, container, res){
  let search_posts_done=false, search_stories_done=false;
  if(pl>=0){
    findUsersPosts(pl);
  }else{
    search_posts_done=true;
    sendUserDataResponse();
  }
  if(sl>=0){
    findUsersStories(sl);
  }else{
    search_stories_done=true;
    sendUserDataResponse();
  }
  function findUsersPosts(p){
    if(p>=0){
      Post.findById(uPI[p].post, (err, post)=> {
        if (err){
          console.log("ERROR: findUsersPosts", err);
        }else{
          container.posts.push(post);
          if(p==0){
            search_posts_done=true;
            sendUserDataResponse();
          }
          findUsersPosts(p-1);
        }
      });
    }
  }
  function findUsersStories(s){
    if(s>=0){
      Story.findById(
        (function(){if(uSI[s].story){return uSI[s].story;} return uSI[s];}()),
        (err, story)=>{
        if (err){
          console.log("ERROR: findUsersStories", err);
        }else{
          container.stories.push(story);
          if(s==0){
            search_stories_done=true;
            sendUserDataResponse();
          }
          findUsersStories(s-1);
        }
      });
    }
  }
  function sendUserDataResponse(){
    if(search_posts_done==true&&search_stories_done==true){
      res.json(container);
    }
  }
}
function sendUserSuggestion(res){
  let container={
    hasData:false
    ,posts:[]
    ,stories:[]
    ,users:[]
  };
  Post.find({}, function(err, posts) {
    if (err){
      console.log("ERROR: sendUserSuggestion Post.find({},", err);
    }else{
      container.posts=posts;
      User.find({}, function(err, users) {
        if (err){
          console.log(err);
        }else{
          users.forEach(function(user){
            let user_last_story=(function(){if(user.user_last_story){return user.user_last_story}return ""}())
            ,part={
              id:user._id
              ,prof_pic:user.user_prof_pic
              ,username:user.username
              ,user_last_story:user_last_story
              ,posts:user.user_posts
            }
            container.users.push(part);
          });
          container.hasData=true;
          findStories(container.users.length-1);
        }
      });
    }
  });
  function findStories(uLength){
    if(uLength>=0){
      if(container.users[uLength].user_last_story){
        Story.findById(container.users[uLength].user_last_story,
          (err, story)=>{
          if (err){
            console.log(err);
          }else{
            container.stories.push(story);
            if(uLength==0){
              res.json(container);
            }
            findStories(uLength-1);
          }
        });
      }else if(uLength==0){
        res.json(container);
      }else{
        findStories(uLength-1);
      }
    }
  }
}
function sendUserActivity(actList, res){
  let activity=[].concat(actList);
  addUsername(activity.length-1);
  function addUsername(i){
    if(i>=0){
      User.findById(activity[i].userId, (err, user)=>{
        if(err){
          console.log(err);
        }else{
          activity[i].user={
            prof_pic:user.user_prof_pic
            ,username:user.username
          };
          if(i==0){
            res.json(activity);
          }
          addUsername(i-1)
        }
      });
    }
  }
}

router.get('/post',(req, res, next)=>{
  let container={
    posts:[]
    ,posts_authors:[]
  }
  Post.findById(req.headers.post, (err, post)=>{
    if (err){
      console.log(err)
    }else{
      container.posts.push(post);
      User.findById(post.author, (err, user)=> {
        if (err){
          console.log(err);
        }else{
          let userParts={
            author_id:user._id
            ,prof_pic:user.user_prof_pic
            ,username:user.username
            ,posts:user.user_posts
          };
          container.posts_authors.push(userParts);
          res.json(container);
        }
      });
    }
  });
});
router.post('/post',uploadHandler.single('post_img'), function (req, res, next) {
  let img=req.file;
  let desc=JSON.parse(req.body.desc);
  let userdate=JSON.parse(req.body.userdate);
  cloudinary.v2.uploader.upload(
    'data:'+ img.mimetype+';base64,'+img.buffer.toString('base64'),
    (err,result)=>{
      if(err){
        console.log(err);
        return;
      }
      var postData = {
        post_description: desc
        ,author: req.session.userId
        ,post_content_url:result.secure_url
        ,post_created:userdate
        ,
      }
      Post.create(postData, function (error, post) {
        if (error) {
          console.log(error)
          return next(error);
        } else {
          User.findByIdAndUpdate(
            req.session.userId,
            {$push: {
              "user_posts": {post: post._id, date: userdate}
            }},
            {safe: true, upsert: true, new : true},
            (err, model)=>{
              if(err){
                console.log(err);
              }
            }
          );
        }
      });
    }
  );
});
router.delete('/post', function (req, res, next) {
  let newId = new mongoose.mongo.ObjectId(req.body.post);
  Post.findByIdAndRemove(req.body.post,
    function(err) {
      if(err){
        console.log(err);
      }else{
        User.findByIdAndUpdate(req.session.userId,
          {$pull: {
            "user_posts": {"post":newId}
            }
          },
          function(err, user) {
            if(err){
              console.log(err);
            }else{
              res.json({success:1});
            }
          }
        );
      }
  });
});
router.get('/story',(req, res, next)=>{
  let container={
    posts:[]
    ,posts_authors:[]
  }
  Post.findById(req.headers.post, (err, post)=>{
    if (err){
      console.log(err)
    }else{
      container.posts.push(post);
      User.findById(post.author, (err, user)=> {
        if (err){
          console.log(err);
        }else{
          let userParts={
            author_id:user._id
            ,prof_pic:user.user_prof_pic
            ,username:user.username
            ,posts:user.user_posts
          };
          container.posts_authors.push(userParts);
          res.json(container);
        }
      });
    }
  });
});
router.post('/story',uploadHandler.single('story_img'), function (req, res, next) {

    let img=req.file;
    let desc=JSON.parse(req.body.desc);
    cloudinary.v2.uploader.upload(
      'data:'+ img.mimetype+';base64,'+img.buffer.toString('base64'),
      (err,result)=>{
        if(err){
          console.log(err);
          return;
        }
        var storyData = {
          story_desc: desc.story_desc
          ,author: req.session.userId
          ,story_url:result.secure_url
          ,story_created:desc.story_date

        }
        Story.create(storyData, function (error, story) {
          if (error) {
            console.log(error)
            return next(error);
          } else {
            User.findByIdAndUpdate(
              req.session.userId,
              {$push: {
                "user_stories": {story: story._id, date: desc.story_date}
              }},
              {safe: true, upsert: true, new : true},
              (err, model)=>{
                if(err){
                  console.log(err);
                }else{
                  User.findByIdAndUpdate(
                    req.session.userId,
                    {user_last_story:story._id},
                    (err, model)=>{
                      if(err){
                        console.log(err);
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    );

});
router.delete('/story', function (req, res, next) {

});

router.post('/following', function (req, res, next) {
  let activityContainer={
    type:2
    ,userId:req.session.userId
    ,time:req.body.time
  }
  ,newId = new mongoose.mongo.ObjectId(req.body.userId),
  newId2 = new mongoose.mongo.ObjectId(req.session.userId);
  User.findByIdAndUpdate(
    req.session.userId,
    {$push:{
        "user_following": newId
      }
    },
    {safe: true, upsert: true, new : true},
    (err, user)=>{
      if(err){
        console.log(err);
      }else{
        User.findByIdAndUpdate(
          req.body.userId,
          {$push:{
              "user_followers":newId2
              ,"user_activity":activityContainer
            }
          },
          {safe: true, upsert: true, new : true},
          (err, user)=>{
            if(err){
              console.log(err);
            }else{
              res.json({message:"success"})
            }
          }
        );
      }
    }
  );
});
router.delete('/following', function (req, res, next) {
  let newId = new mongoose.mongo.ObjectId(req.body.userId),
  newId2 = new mongoose.mongo.ObjectId(req.session.userId);
  User.findByIdAndUpdate(
    req.session.userId,
    {$pull:{
        "user_following":newId
      }
    },
    (err, user)=>{
      if(err){
        console.log(err);
      }else{
        User.findByIdAndUpdate(
          req.body.userId,
          {$pull:{
              "user_followers":newId2
            }
          },
          (err, user)=>{
            if(err){
              console.log(err);
            }else{
              res.json({message:"success"})
            }
          }
        );
      }
    }
  );
});
router.post('/like', function (req, res, next) {
  let activityContainer={
    type:0
    ,postId:req.body.post
    ,userId:req.session.userId
    ,time:req.body.time
  }
  ,newId = new mongoose.mongo.ObjectId(req.session.userId);
  Post.findByIdAndUpdate(
    req.body.post,
    {$push: {
      "post_likes": {user_id:newId}
    }},
    {safe: true, upsert: true, new : true},
    (err, post)=>{
      if(err){
        console.log(err);
      }else{
        User.findByIdAndUpdate(req.body.author,
        {$push:{
          "user_activity":activityContainer
        }},
        {safe: true, upsert: true, new : true}
        ,(err, model)=>{
          if(err){
            console.log(err);
          }else(
            res.json({message:"success"})
          )
        });
      }
    }
  );
});
router.delete('/like', function (req, res, next) {
  let newId = new mongoose.mongo.ObjectId(req.session.userId);
  Post.findByIdAndUpdate(
    req.body.post,
    {$pull: {
      "post_likes": {user_id:newId}
    }},
    (err, model)=>{
      if(err){
        console.log(err);
      }else{
        res.json({message:"success"})
      }
    }
  );
});
router.post('/comment', function (req, res, next) {
  let activityContainer={
    type:1
    ,postId:req.body.post
    ,userId:req.session.userId
    ,time:req.body.time
  };
  Post.findByIdAndUpdate(
    req.body.post,
    {$push: {
      "post_comments": {comment:req.body.comment}
    }},
    {safe: true, upsert: true, new : true},
    (err, model)=>{
      if(err){
        console.log(err);
      }else{
        User.findByIdAndUpdate(req.body.author,
        {$push:{
          "user_activity":activityContainer
        }},
        {safe: true, upsert: true, new : true}
        ,(err, model)=>{
          if(err){
            console.log(err);
          }else(
            res.json({message:"success"})
          )
        });
      }
    }
  );
});
router.delete('/comment', function (req, res, next) {
  let newId = new mongoose.mongo.ObjectId(req.body.post);
  Post.findByIdAndUpdate(
    newId,
    {$pull:{
      "post_comments":{
          "comment.created":req.body.commentId
        }
      }
    },
    { safe: true, upsert: true },
    (err, model)=>{
      console.log("2")
        if(err){
          console.log(err);
          return;
        }else{
          res.json({message:"success"})
        }
    }
  );
});
router.get('/search', function (req, res, next){
  let searchFilter=new RegExp("^"+req.headers["searchreq"],"gm");
  let container={
    hasData:false
    ,profiles:[]
  }
  User.find({},(err, users)=>{
    if(err){
      console.log(err);
    }else{
      users.forEach(function(user){
        if(user.username.match(searchFilter)){
          let userPart={
            id:user._id
            ,username:user.username
            ,prof_pic:user.user_prof_pic
            ,email:user.email
          }
          container.profiles.push(userPart);
        }
      });
      if(container.profiles.length>0){
        container.hasData=true;
      }
      res.json(container);
    }
  });
});
*/
/*shat by me*/


module.exports = router;
