var express = require("express");
var router  = express.Router();
var async = require('async');

var Result = require('../models/results');

//router.route('/:id')
router.route('/:id')
	.get(function(req, res, next){
	async.parallel({
		result: function(callback){
			Result.find({ '_formid' : req.params.id}).exec(callback);
		},
	}, function(err, results){
		if(err) {return next(err);}
		if(results.result == null){
			var err = new Error('Result not found');
			err.status = 404;
			return next(err);
		}
		console.log("결과: ");
		console.log(results.result.data);
		res.render('result', {resultinfo: results.result});
	});
});

module.exports = router;
