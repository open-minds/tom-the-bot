var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var newsSchema = new Schema({	'text' : String,	'date' : String,	'active' : Boolean});

module.exports = mongoose.model('news', newsSchema);
