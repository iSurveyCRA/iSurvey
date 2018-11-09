var Result = require('../models/results');
var User = require('../models/user');
var Department = require('../models/departments');

var async = require('async');


exports.saveResult = function(req,res,next){
	//(xhr.send로 보내준)survey답변시 저장될 정보들
	var data = req.body.Json;
	var url = req.body.Url;

	async.parallel({
		user: function(callback){
			User.findOne({'_id':req.session.userId }).exec(callback);
		},
		result: function(callback){
			Result.findOne({$and:[{'student_id':req.session.userId},{'_formid':url.split('/')[4]}]}).exec(callback);
		}
	}, function(err, results){
		if(err) { return next(err); }
		Department.findOne({'_id':results.user.user_department},function(err,department){
		var formData = results.user;
		var resultInfo = new Result({
			student_id: formData._id ,
			user_department: formData.user_department ,
			data: data,
			_formid: url.split('/')[4],
			student_id_num : formData.student_id,
			user_department_str: department.name
		});

		
//		console.log(results.result);
		if(results.result == null){
		resultInfo.save(function(err) {
			if(err) {res.render('error', {error: 'Failed'});
			} else { console.log("Inserted one result to 'results' collection");}
			});
		}else{
			console.log("Already respond");
			res.render('error', {error:'Already respond'});
		}
	});
	});
}
