const mongoose = require('mongoose');

const UserSettingsSchema = new mongoose.Schema({

});

const UserSettings = mongoose.model('UserSettings', UserSettingsSchema);
module.exports = UserSettings;
