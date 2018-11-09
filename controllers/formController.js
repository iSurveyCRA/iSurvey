var Form = require('../models/forms');
var User = require('../models/user');

var async = require('async');


exports.saveForm = function(req, res, next) {
	//xhr.send에서 JSON.stringify로보내기 때문에 다시 parse해주어야 한다. 
	var data = JSON.parse(req.body.Json);
	var id = JSON.parse(req.body.ID);
	console.log(id);
	async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                }
//		form: function(callback){
//			Form.findOne({'_id':url.split('/')[4]}).exec(callback);
//		}
        }, function(err, results){
		if (err) { return next(err); }
		//if (id == 0){
			var formData = results.user;
			var formInfo = new Form({
                        	username: formData.username,
                        	student_id: formData._id,
                       		user_department: formData.user_department,
                        	data: data
                	});
        		formInfo.save(function(err) {
                		if(err) { res.render('result', {result: 'Failed'}); 
                		} else { console.log("Inserted one account to 'forms' collection");}
        		});

	});
	
};

exports.modifyForm = function(req, res, next) {
        //xhr.send에서 JSON.stringify로보내기 때문에 다시 parse해주어야 한다. 
        var data = JSON.parse(req.body.Json);
	console.log(req.body.ID);
	var id = req.body.ID;
         async.parallel({
                user: function(callback){
                        User.findOne({ '_id':req.session.userId}).exec(callback);
                },
        }, function(err, results){
                if (err) { return next(err); }
//                        var formData = results.user;
//                        var formInfo = new Form({
//                                username: formData.username,
//                                student_id: formData._id,
//                                user_department: formData.user_department,
//                                data: data
//                        });

//                        formInfo.save(function(err) {
			Form.findOneAndUpdate({'_id':id}, {data:data},{new:true}, function(err, form){
                                if(err) { res.render('error', {error: 'Failed'});
                                } else { console.log("Modify one account to 'forms' collection");}
                        });

        });

};

