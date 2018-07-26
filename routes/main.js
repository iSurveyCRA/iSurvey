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

router.get('/mypage', function(req, res, next){
	if (!req.session.userId)
                res.redirect('/loginpage');
        else
                res.render('mypage');
});

router.get('/forms', function(req, res, next){
	if(!req.session.userId)
		res.redirect('/loginpage');
	else
		res.render('forms');
});

router.get('/gls', function(req, res, next){
        if (!req.session.userId)
                res.redirect('/loginpage');
        else
                res.render('gls');
});

router.get('/management', function(req, res, next){
        if (!req.session.userId)
                res.redirect('/loginpage');
        else
                res.render('management');
});

router.get('/international', function(req, res, next){
        if (!req.session.userId)
                res.redirect('/loginpage');
        else
                res.render('international');
});


module.exports = router;
