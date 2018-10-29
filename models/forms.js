var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FormSchema = new Schema({
        username: {type: String, required: true},
        student_id: {type: Number, required: true},
        user_department: {type: String, required: true},
        date: {type: Date, default: Date.now, required: true},
        data: {type: Object, required: true}
});

FormSchema.virtual('url').get(function(){
	return '/survey/' + this._id;
});

module.exports = mongoose.model('Form', FormSchema);
