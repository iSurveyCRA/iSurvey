var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FormSchema = new Schema({
        username: {type: String, required: true},
        student_id: Schema.Types.ObjectId,
        user_department: Schema.Types.ObjectId,
        date: {type: Date, default: Date.now, required: true},
        data: {type: Object, required: true}
});

FormSchema.virtual('url').get(function(){
	return '/survey/' + this._id;
});

module.exports = mongoose.model('Form', FormSchema);
