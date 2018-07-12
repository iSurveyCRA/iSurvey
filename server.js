var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017/userInfo';

var insertDocuments = function(db, query, callback){
	var collection = db.collection('accounts');
	collection.insertOne(query, function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		assert.equal(1, result.ops.length);
		console.log("Inserted one account into 'accounts' collection");
		callback(result);
	});
}

var checkDocumentsQuery = function(db, query, callback){
	var collection = db.collection('accounts');

	collection.findOne(query, function(err, account){
		if (err) throw err;

		if (account == null){
			callback(false);
		} else {
			callback(true);
		}
	});
}

app.use(express.json());
app.use(express.urlencoded());

app.get('/loginpage', function(req, res){
	res.sendFile(path.join(__dirname + '/login.html'));
});

function readHtml(result, res){
	var html = fs.readFile('./result.html', function(err, html){
		html = " " + html;
		html = html.replace("<%RESULT%>", result);

		res.set('Content-Type', 'text/html');
		res.send(html);
	});
}

app.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var spawn = require('child_process').spawn
	var process = spawn('python', ["./seleniumLogin.py", username, password]);

	process.stdout.on('data', function(data){
		userData = JSON.parse(data);
		error = {'error':'true'}
		if(userData == error){
			readHtml('Login Failed!', res);
		} else if(userData['student_id']){
			MongoClient.connect(url, function(err, db){
				assert.equal(err, null);
				console.log("Successfully connected to userInfo DB");
				checkDocumentsQuery(db, userData, function(result){
					if (result == false){
						insertDocuments(db, userData, function(){
							readHtml('Register and Login Success!', res);
							db.close();
						});
					} else {
						readHtml('Login Success!', res);
						db.close();
					}


				});
				
			});
		} else {
			readHtml('Login Failed!', res);
		}
	});
});



app.listen(3000, ()=>{
	console.log("server started at http://locahost:3000");
});
