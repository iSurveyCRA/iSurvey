var express = require("express");
var router = express.Router();
var async = require('async');
var Form = require('../models/forms');

router.route('/:id')
	.get(function(req,res,next){

	async.parallel({

		_delete : function(callback){

			Form.deleteOne({ '_id' : req.params.id}).exec(callback);

		}
	},function(err,results){
			if(err){return next(err); }
			if(results._delete){
			console.log("delete Successful");
		}
		res.redirect('/mypage');
});

});

module.exports = router;
