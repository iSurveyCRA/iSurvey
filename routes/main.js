var express = require('express');
var router = express.Router();

// GET Main page
// 사용자에게 userId라는 Session Field가 존재하면 메인페이지를,
// 아니면 로그인 페이지로 가게 한다.
router.get('/', function(req, res, next){
	if (!req.session.userId)
		res.redirect('/loginpage');
	else
		res.render('layout');
});

module.exports = router;
