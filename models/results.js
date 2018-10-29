var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResultSchema = new Schema({
        student_id: {type: Number, required: true},
        user_department: {type: String, required: true},
        data: {type: Object, required: true},
	_formid: Schema.Types.ObjectId
});


module.exports = mongoose.model('Result', ResultSchema);
