//search를 위한 schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
    title:String,
    content:String,
    department:String,
});


module.exports = mongoose.model('Search', SearchSchema);
