var express = require("express");
var router  = express.Router();
var async = require('async');

var Result = require('../models/results');
var Form = require('../models/forms');

router.route('/:id')
	.get(function(req, res, next){
//	console.log(req.params.id);
	 async.parallel({
                result: function(callback){
               //        Result.findById(req.params.id).exec(callback);
			Result.find({ '_formid':req.params.id}).exec(callback);
		},
		survey: function(callback){
			Form.findById(req.params.id).exec(callback);
                },
        }, function(err, results){
                if(err) { return next(err); }
                if(results.result == null){
                        var err = new Error('Survey not found');
                        err.status = 404;
                        return next(err);
                }
		console.log("결과: ");
		console.log(results.result);
		res.render('result', {resultinfo: results.result, forminfo:results.survey});
        });

 
});


module.exports = router;

