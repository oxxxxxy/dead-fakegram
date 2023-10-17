//a first draft
const mongoose = require('mongoose');

const PatternSchema = new mongoose.Schema({

});

const Pattern = mongoose.model('Pattern', PatternSchema);
module.exports = Pattern;
