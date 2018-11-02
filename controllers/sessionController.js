var User = require('../models/user');
var Results = require('../models/results');
var Department = require('../models/departments');
var Form = require('../models/forms');

var async = require('async');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/iSurveyTest';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

exports.mypage = function(req, res, next){
	async.parallel({
		user: function(callback){
			User.findOne({ '_id':req.session.userId}).exec(callback);
		},
		result: function(callback){
			Results.countDocuments({ 'student_id':req.session.userId }).exec(callback);
		},
		form: function(callback){
			Form.countDocuments({ 'student_id':req.session.userId }).exec(callback);
		},
	}, function(err, results){
		Department.findOne({ '_id':results.user.user_department}, function(err, department){
			res.render('mypage', {userinfo:results.user, department: department, num_res:results.result, num_form:results.form});
		});
	});
};

exports.layout = function(req, res, next){
        async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
                if (!req.session.userId)
			res.redirect('/loginpage');

		else  res.render('layout', {userinfo:results.user});
        });
};

exports.forms = function(req, res, next){
        async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
                res.render('forms', {userinfo:results.user});
        });
};

exports.gls = function(req, res, next){
        async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
                res.render('gls', {userinfo:results.user});
        });
};

exports.management = function(req, res, next){
        async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
                res.render('management', {userinfo:results.user});
        });
};

exports.international = function(req, res, next){
        async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
                res.render('international', {userinfo:results.user});
        });
};


