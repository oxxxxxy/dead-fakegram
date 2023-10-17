const mongoose = require('mongoose');

const UserPreviousDataSchema = new mongoose.Schema({
  userNumber: Number
  ,userId: mongoose.Schema.Types.ObjectId

});

const UserPreviousData = mongoose.model('UserPreviousData', UserPreviousDataSchema);
module.exports = UserPreviousData;
