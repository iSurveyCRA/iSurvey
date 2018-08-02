var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
    title:String,
    content:String,
    department:String,
});

 
module.exports = mongoose.model('Form', FormSchema);

