var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/iSurveyTest';

var insertDocuments = function(db, query, callback){
  var collection = db.collection('forms');

  collection.insertOne(query, function(err,result){
    assert.equal(err,null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted one account to 'forms' collection");
    callback(result);
  });
}

//exports.saveForm = function(req, res, next){
//	console.log(req.body.Json);
//}

//form 저장하기
exports.saveTomongo = function(req, res, next) {
	//xhr.send에서 JSON.stringify로보내기 때문에 다시 parse해주어야 한다. 
	var data = JSON.parse(req.body.Json);
	MongoClient.connect(url, function(err, db){
		assert.equal(err,null);
		console.log("Successfully connected to DB");
		insertDocuments(db, data ,function(){
			 db.close();
		});
	});
}
