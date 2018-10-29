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
	}, function(err, results){
		if(err) { return next(err); }
		var formData = results.user;
		var resultInfo = new Result({
			student_id: formData.student_id ,
			user_department: formData.user_department ,
			data: data,
			//surveyid: url.split('/')[4]
			_formid: url.split('/')[4]
		});
		

		resultInfo.save(function(err) {
			if(err) {res.render('result', {result: 'Failed'});
			} else { console.log("Inserted one result to 'results' collection");}
			});

	});
	
}
