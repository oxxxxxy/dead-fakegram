const path = require('path');

const User = require('../models/user');

const TEMPLATES_PATH = path.join(__dirname, '..', 'templates');

exports.index = (req, res, next) => {
  User.findById(req.session.userId)
  .exec((error, user) => {
    if (error) {
      next(error);
    } else {
      if (user) {
        res.sendFile(path.join(TEMPLATES_PATH + '/main.html'));
      } else {
        res.sendFile(path.join(TEMPLATES_PATH + '/signup.html'));
      }
    }
  });
};
