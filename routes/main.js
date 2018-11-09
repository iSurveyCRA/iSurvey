var express = require('express');
var router = express.Router();
var form_controller = require('../controllers/formController');
var result_controller = require('../controllers/resultController');
var session_controller = require('../controllers/sessionController');
//var surveyResult_controller = require('../controllers/surveyResultController');
// GET Main page
// 사용자에게 userId라는 Session Field가 존재하면 메인페이지를,
// 아니면 로그인 페이지로 가게 한다.

router.get('/', session_controller.layout);
router.get('/mypage', session_controller.mypage);
router.get('/home', session_controller.layout);
router.get('/forms', session_controller.forms);
router.get('/gls', session_controller.gls);
router.get('/csee', session_controller.csee);
router.get('/management', session_controller.management);
router.get('/international', session_controller.international);

router.post('/saveForm', form_controller.saveForm);
router.post('/modifyForm', form_controller.modifyForm);
router.post('/saveResult', result_controller.saveResult);
//router.post('/surveyResult', surveyResult_controller.surveyResult);
module.exports = router;
