const mongoose = require('mongoose');

const UserInterimContentLayerSchema = new mongoose.Schema({
  userNumber: Number
  ,userId: mongoose.Schema.Types.ObjectId
  ,user_description:{
     type:String
     ,default:''
  }
  ,userDefaultProfilePicture: 'https://yt3.ggpht.com/-Pu32BMgmWFU/AAAAAAAAAAI/AAAAAAAAAAA/kfLIGFWnaz8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg'
  ,userCurrentProfilePicture: {
    type: String
  }
  ,userLastStory:mongoose.Schema.Types.ObjectId

});

const UserInterimContentLayer = mongoose.model('UserInterimContentLayer', UserInterimContentLayerSchema);
module.exports = UserInterimContentLayer;
