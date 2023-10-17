
const bcrypt = require('bcrypt');


const path = require('path');

const User = require('../models/user');
const CONFIG = require('../config');

const TEMPLATES_PATH = path.join(__dirname, '..', 'templates');

const emailRegExp = new RegExp(/^[\S]+@\S+\.\S+/);
const mobileNumberRegExp = new RegExp(/^\d+$/);
const usernameRegExp = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/);
const passwordRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
const areThereAnyWhiteSpaces = /\s+/;
const loginTypes = ['email', 'mobileNumber', 'username'];

exports.signup = async (req, res, next) => {
  let isFormValid = true
  ,isInputUnique = true
  ,responseContainer = {};

  if ((!req.body.mobileNumber && !req.body.email) || !req.body.fullName || !req.body.username || !req.body.password || !req.body.passwordConfirm) {
    if(!req.body.mobileNumber && !req.body.email){
      responseContainer.mobileOrEmail = 'Field is required.';
    }
    if(!req.body.fullName){
      responseContainer.fullName = 'Field is required.';
    }
    if(!req.body.username){
      responseContainer.username = 'Field is required.';
    }
    if(!req.body.password){
      responseContainer.password = 'Field is required.';
    }
    if(!req.body.passwordConfirm){
      responseContainer.passwordConfirm = 'Field is required.';
    }
    isFormValid = false;
  }

  if(areThereAnyWhiteSpaces.test(req.body.mobileNumber) || areThereAnyWhiteSpaces.test(req.body.email)){
    isFormValid = false;
    responseContainer.mobileOrEmail = 'Email or Mobile Number shouldn\'t have any white spaces.';
  }else if(!mobileNumberRegExp.test(req.body.mobileNumber) && !emailRegExp.test(req.body.email)){
    isFormValid = false;
    responseContainer.mobileOrEmail = 'INCORRECT INPUT.';
  }

  if(!usernameRegExp.test(req.body.username)){
    isFormValid = false;
    responseContainer.username = 'Username should have minimum three characters and can contain only 0-9, a-z, A-Z, without any other characters.';
  }
  if(!passwordRegExp.test(req.body.password)){
    isFormValid = false;
    responseContainer.password = 'Password should have minimum eight characters, at least one letter, one number and one special character.';
  }
  if(!(req.body.password == req.body.passwordConfirm)){
    isFormValid = false;
    responseContainer.passwordConfirm = 'Passwords DO NOT match.';
  }

  if(!isFormValid){
    next(responseContainer);
    return;
  }


  let inputs = [{}, {username: req.body.username}];

  if(req.body.mobileNumber){
    inputs[0].mobileNumber = req.body.mobileNumber;
  }else{
    inputs[0].email = req.body.email;
  }

  let requests = inputs.map(object => checkUniqueness(object))
  ,doesTheseExistAlready = Promise.all(requests)
  ,result;

  try {
    result = await doesTheseExistAlready;
  } catch(err) {
    next(err);
    return;
  }

  if(false == result.find(element => element == false)){
    if(result[0] == false){
      if(req.body.mobileNumber){
        responseContainer.mobileOrEmail = 'This mobile number already exists.';
      }else{
        responseContainer.mobileOrEmail = 'This email already exists.';
      }
    }
    if(result[1] == false){
      responseContainer.username = 'This username already exists.';
    }
    isInputUnique = false;
  }

  if(!isInputUnique){
    next(responseContainer);
    return;
  }

  const userData = {
    username : req.body.username
    ,password : req.body.password
    ,fullName : req.body.fullName
  };

  if(req.body.mobileNumber){
    userData.mobileNumber = req.body.mobileNumber;
  }else{
    userData.email = req.body.email;
  }

  User.create(userData, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.json({url: '/accounts/login'});
    }
  });
}

function checkUniqueness(obj){
  return new Promise((resolve, reject) => {
    User.findOne(obj)
    .exec((err, user) => {
      if (err) {
        reject(err);
      }
      if(user){
        resolve(false);
      }
      resolve(true);
    });
  });
}

exports.login = (req, res, next) => {
  let isFormValid = true
  ,responseContainer = {}
  ,login = {};

  if(!req.body.login){
    responseContainer.login = 'Field is required.';
    isFormValid = false;
  }else if(!req.body.password){
    responseContainer.password = 'Field is required.';
    isFormValid = false;
  }

  if(areThereAnyWhiteSpaces.test(req.body.login)){
    isFormValid = false;
    responseContainer.login = 'Field shouldn\'t have any white spaces.';
  }else if(areThereAnyWhiteSpaces.test(req.body.password)){
    isFormValid = false;
    responseContainer.password = 'Password shouldn\'t have any white spaces.';
  }

  if(!req.body.hasOwnProperty('type')){
    if(emailRegExp.test(req.body.login)){
      login.email = req.body.login;
    }else if(mobileNumberRegExp.test(req.body.login)){
      login.mobileNumber = req.body.login;
    }else if(usernameRegExp.test(req.body.login)){
      login.username = req.body.login;
    }else{
      isFormValid = false;
      responseContainer.login = 'INCORRECT INPUT.';
    }
  }else{
    login[loginTypes[req.body.type]] = req.body.login;
  }

  if(!isFormValid){
    next(responseContainer);
    return;
  }

  User.authenticate(login, req.body.password, (error, user) => {
    console.log("as", error, login)
      if (error || !user) {
        responseContainer.wrongLoginOrPassword = 'Wrong login or password.';
        responseContainer.status = 401;
        next(responseContainer);
      } else {
        req.session.userId = user._id;
        res.json({url: '/'});
        //res.redirect('/');
      }
    });
}

exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/accounts/login');
      }
    });
  }
}

exports.loginPage = (req, res, next) => {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user) {
        return res.redirect('/');
      }
      return res.sendFile(path.join(TEMPLATES_PATH + '/login.html'));
    }
  });
}

exports.signupPage = (req, res, next) => {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user) {
        return res.redirect('/');
      }
      return res.sendFile(path.join(TEMPLATES_PATH + '/signup.html'));
    }
  });
}

exports.guest = (req, res, next) => {
  User.authenticate(CONFIG.guest.login, CONFIG.guest.password, (error, user) => {
      if (error || !user) {
        let err = new Error('Wrong login or password.');
        err.status = 401;
        next(err);
      } else {
        req.session.userId = user._id;
        res.redirect('/');
      }
    });
}
