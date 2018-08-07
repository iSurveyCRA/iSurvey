var express = require("express");
var router  = express.Router();
//var session_controller = require('../controllers/sessionController');
var Form = require('../models/forms');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/iSurveyTest';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
router.get('/', function(req,res){
	if(req.query.search) {
		console.log(req.query.search);
		//res.redirect('/');
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');

		Form.find({"data.title" :  regex }, function(err, result){
			if(err){ console.log(err);
			} else {
	  		 	if(result.length < 1) {
		  		 console.log("No campgrounds match that query, please try again.");
				 }
	   			console.log(result);

	   			res.render("search",{isurveytest:result});
	   			return;
			}
 		});

	} else {
	console.log(1);
 // Get all campgrounds from DB
 		Form.find({}, function(err, result){
			if(err){
				console.log(err);
			} else {
	   			res.render("search", {isurveytest:result});
			}
 		});
	}
});	
	
    function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}

module.exports = router;
