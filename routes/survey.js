var express = require("express");
var router  = express.Router();
var async = require('async');

var Form = require('../models/forms');

router.route('/')
	.get(function(req, res, next){
	res.render('survey');
	});
/*
router.get('/:id', function(req,res){
	console.log(req.params.id);

	 async.parallel({
                survey: function(callback){
                        Form.findById(req.params.id).exec(callback);
			//Form.findOne({ '_id':req.params.id}).exec(callback);
                },
        }, function(err, results){
                if(err) { return next(err); }
                if(results.survey == null){
                        var err = new Error('Survey not found');
                        err.status = 404;
                        return next(err);
                }
		console.log(results.survey.data);
//		res.render('survey', {forminfo: results.survey});
        });

//	res.render('survey');
 
});
*/


module.exports = router;

