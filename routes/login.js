var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/loginController');

// GET login page
router.get('/', function(req, res, next){
	res.render('login');
});
/* POST Login Function */
router.post('/login', login_controller.login);

module.exports = router;
