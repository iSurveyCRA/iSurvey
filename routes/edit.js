var express = require("express");
var router  = express.Router();
var async = require('async');

var Form = require('../models/forms');

router.route('/:id')
        .get(function(req, res, next){
//      console.log(req.params.id);
         async.parallel({
                survey: function(callback){
                        Form.findById(req.params.id).exec(callback);
                        //Form.findOne({ '_id':req.params.id}).exec(callback);
                },
        }, function(err, results){
                if(err) { return next(err); }
                if(results.survey == null){
                        var err = new Error('Survey not found');
                        err.status = 404;
                        return next(err);
                }
                console.log("결과: ");
                console.log(results.survey.data);
                res.render('edit', {forminfo: results.survey, formid: req.params.id});
        });


});


module.exports = router;
