var User = require('../models/user');

var async = require('async');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/iSurveyTest';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var key = 'd6F3Efeq';

//function encrypt 
function encrypt(key, data) {
	var cipher = crypto.createCipher('aes-256-cbc', key); //use crypto module to create cipher and decipher
	var crypted = cipher.update(data, 'utf-8', 'hex'); //updates plain text to crypted text
	crypted += cipher.final('hex'); //produces encrypted text

	return crypted;
}
//function decrypt
function decrypt(key, data) {
	var decipher = crypto.createDecipher('aes-256-cbc', key);
	var decrypted = decipher.update(data, 'hex', 'utf-8');
	decrypted += decipher.final('utf-8');

	return decrypted;
}

// Login Function
exports.login = function(req, res, next){
	async.parallel({
		user: function(callback){
			User.findOne({ 'username': req.body.username }).exec(callback);
		},
	}, function(err, results){
		if (err) { return next(err); }
		if (results.user==null || results.user.name==null){
			var spawn = require('child_process').spawn
			var process = spawn('python3.5', ["python/seleniumLogin.py", req.body.username, req.body.password]);
			process.stdout.on('data', function(data){
				var userData = JSON.parse(data);
				if (typeof userData.password==='undefined') { res.render('result', {result:'Failed'}); }
				userData.password = encrypt(key, userData.password);
				var userInfo = new User({
					username: userData.username,
					password: userData.password,
					name: userData.name,
					grade: userData.grade,
					student_id: userData.student_id,
					user_department: userData.user_department
				});
				userInfo.save(function(err) {
					if (err) { res.render('result', {result:'Failed'}); }
				});
				req.session.userId = userInfo._id;
				res.redirect('/');
			});
		} else {
			ans = decrypt(key, results.user.password);
			if (ans==req.body.password){
				// 사용자의 session의 userId라는 필드에 현재 로그인한 사용자의 ObjectId를 저장한다.
				req.session.userId = results.user._id;
	 			res.redirect('/'); 
			} else { 
				res.render('result', {result:'Wrong Password'}); 
			}
		}
	});
};

exports.logout = function(req, res, next){
	req.session.destroy();
	res.redirect('/');
};
