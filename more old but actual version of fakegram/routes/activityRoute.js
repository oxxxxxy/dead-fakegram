const path = require('path');

const User = require('../models/user');

const TEMPLATES_PATH = path.join(__dirname, '..', 'templates');

exports.index = (req, res, next) => {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.sendFile(path.join(TEMPLATES_PATH + '/badway.html'));
      } else {
        return res.sendFile(path.join(TEMPLATES_PATH + '/activity.html'));
      }
    }
  });
}
