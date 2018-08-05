//mongodb에 form 저장할때  model schema 정해주기
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FormSchema = new Schema({
        username: {type: String, required: true},
        student_id: {type: Number, required: true},
        user_department: {type: String, required: true},
//        date: {type: Date, required: true},
        data: {type: Object, required: true}
});

module.exports = mongoose.model('Form', FormSchema);
