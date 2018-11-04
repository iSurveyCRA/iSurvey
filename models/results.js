var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResultSchema = new Schema({
        student_id: Schema.Types.ObjectId,
        user_department: Schema.Types.ObjectId,
        data: {type: Object, required: true},
	_formid: Schema.Types.ObjectId
});

ResultSchema.virtual('url').get(function(){
       // return '/result/' + this._id;
	return '/result/' + this._formid;
});

module.exports = mongoose.model('Result', ResultSchema);

