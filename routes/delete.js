var express = require("express");
var router = express.Router();
var async = require('async');
var Form = require('../models/forms');
var Result = require('../models/results');
router.route('/:id')
	.get(function(req,res,next){

	async.parallel({

		_deleteForm : function(callback){

			Form.deleteOne({ '_id' : req.params.id}).exec(callback);

		},
		
		_deleteResult : function(callback){

			Result.deleteMany({ '_formid' :req.params.id}).exec(callback);
			
		}
	},function(err,results){
			if(err){return next(err); }
			if(results._deleteForm && results._deleteResult){
			console.log("delete Successful");
		}
		res.redirect('/mypage');
});

});

module.exports = router;
