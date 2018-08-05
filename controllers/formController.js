var Form = require('../models/forms');
var Search = require('../models/search');
var User = require('../models/user');

var async = require('async');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/iSurveyTest';


//form 저장하기
exports.saveForm = function(req, res, next) {
	//xhr.send에서 JSON.stringify로보내기 때문에 다시 parse해주어야 한다. 
	var data = JSON.parse(req.body.Json);

	 async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
		if (err) { return next(err); }
			var formData = result.user;	
			var formInfo = new Form({
                        	username: formData.username,
                        	student_id: formData.student_id,
                       		user_department: formData.user_department,
                	//      date: formData.date,
                        	data: data
                	});
        		formInfo.save(function(err) {
                	if(err) { res.render('result', {result: 'Failed'}); }
                	else { console.log("Inserted one account to 'forms' collection");}
        		});

	});
	
};
