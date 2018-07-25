var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/loginController');

// GET login page
// 만일 session의 userId가 존재한다면 바로 홈페이지로 보낸다.
router.get('/', function(req, res, next){
	if(!req.session.userId)
		res.render('login');
	else
		res.redirect('/');
});
/* POST Login Function */
router.post('/login', login_controller.login);

router.get('/logout', login_controller.logout);

module.exports = router;
