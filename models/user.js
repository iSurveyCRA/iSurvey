var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
	grade: {type: Number, required: true},
	student_id: {type: Number, required: true},
	user_department: Schema.Types.ObjectId,
});

UserSchema.virtual('url').get(function(){
	return '/mypage/' + this._id;
});

module.exports = mongoose.model('User', UserSchema);
