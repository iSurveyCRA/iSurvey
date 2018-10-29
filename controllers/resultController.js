var Result = require('../models/results');
var User = require('../models/user');

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
			Result.findOne({'student_id':req.body.student_id}).exec(callback);
			
		},
	}, function(err, results){
			if(err) { return next(err); }
			var formData = results.user;
			var resultInfo = new Result({
				student_id: formData.student_id ,
				user_department: formData.user_department ,
				data: data,
				_formid: url.split('/')[4]
			});
			console.log(results.result.student_id);
			//if(Result.findOne({'_formid':url.split('/')[4]}) != null){
			//console.log(result.formId);
			//	console.log("already respond");	
				//res.render('result', {result: 'Already respond'});
			//} else{
				resultInfo.save(function(err) {
					if(err) {res.render('result', {result: 'Failed'});
					}else {
				 	console.log("Inserted one result to 'results' collection");}
				});
		//	}
		});
}
