var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

// GET login page
router.get('/', function(req, res, next){
	res.render('layout');
});

module.exports = router;
