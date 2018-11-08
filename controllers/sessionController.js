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
			Results.find({ 'student_id':req.session.userId }).exec(callback);
		},
		form: function(callback){
			Form.find({ 'student_id':req.session.userId }).exec(callback);
		},
	}, function(err, results){
		var result_form = [];
		var flag = 0;
		if(results.result.length == 0){
			Department.findOne({ '_id':results.user.user_department}, function(err, department){
				res.render('mypage', {userinfo:results.user, department: department, num_res:results.result.length, num_form:results.form.length, form:results.form, result:result_form});
			});
		} else {
			for(var i=0; i<results.result.length; i++){
				console.log(i);
				async.parallel({
					form: function(callback){
						Form.findOne({ '_id':results.result[i]._formid}).exec(callback);
					},
					department: function(callback){
						Department.findOne({'_id':results.user.user_department}).exec(callback);
					},
					user_dep: function(callback){
						Department.findOne({'_id':results.user.user_department}).exec(callback);
					},
				}, function(err, results2){
					result_form.push(results2);	
					flag += 1;
					if(flag == results.result.length){
						res.render('mypage', {userinfo:results.user, department: results2.user_dep, num_res:results.result.length, num_form:results.form.length, form:results.form, result:result_form});
					}
				});
			}
		}
	});
};

exports.layout = function(req, res, next){
        async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
		form: function(callback){
			Form.find({}).sort({'date':'descending'}).exec(callback);
		},
        }, function(err, results){
                if (!req.session.userId){
			res.redirect('/loginpage');
		} else { 
			async.parallel({
				department_form: function(callback){
					Form.find({'user_department':results.user.user_department}).sort({'date':'descending'}).exec(callback);
				},
				department: function(callback){
					Department.findOne({'_id':results.user.user_department}).exec(callback);
				},
			}, function(err, results2){
				var result_form = [];
				var flag = 0;
				for(var i=0; i<5; i++){
					async.parallel({
						department: function(callback){
							Department.findOne({'_id':results.form[i].user_department}).exec(callback);
						},
					}, function(err, results3){
						var temp = {form: results.form[flag], department: results3.department};
						result_form.push(temp);
						flag += 1;
						if(flag == 5){
							res.render('board', {userinfo:results.user, result:result_form, dep_result:results2.department_form, department:results2.department});
						}
					});
				}
				
			});
		}	
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


