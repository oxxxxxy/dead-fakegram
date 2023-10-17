//a first draft
const mongoose = require('mongoose');

const DialogueSchema = new mongoose.Schema({
  members:[
    //{userId:'id'}
  ],
  messages: [
    // {from:'id', content:'text', creationTime:date, viewed:[userId]}
  ],
  creationTime:Date
});

const Dialogue = mongoose.model('Dialogue', DialogueSchema);
module.exports = Dialogue;
