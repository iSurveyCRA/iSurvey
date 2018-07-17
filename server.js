// require necessary modules
var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

// url to access MongoDB
var url = 'mongodb://localhost:27017/userInfo';

// Function to Insert Data
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

// Function to search for Data
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

// middleware to get http requests in POST method and JSON type
app.use(express.json());
app.use(express.urlencoded());

// send login.html
app.get('/loginpage', function(req, res){
	res.sendFile(path.join(__dirname + '/login.html'));
});

// Function to send modified html file
function readHtml(result, res){
	// open result.html
	var html = fs.readFile('./result.html', function(err, html){
		html = " " + html;   // somewhat necessary
		html = html.replace("<%RESULT%>", result);  // replace '<%RESULT%>' part of the html file into input we got as 'result' variable

		res.set('Content-Type', 'text/html');  // set response content type as html text
		res.send(html);  // send modified html file
	});
}

// executed when user press login button
app.post('/login', function(req, res){
	// take inputs given by user
	var username = req.body.username;
	var password = req.body.password;
	
	var account = { "username" : username, "password" : password};


	MongoClient.connect(url,function(err,db){
		assert.equal(null, err);
		console.log("connected successfully to server");
		
	checkDocumentsQuery(db,account,function(result){
		if (result == false){
	// make child_process and run 'seleniumLogin.py' with 'python3.5' 
	// and giving username and password as argument
	var spawn = require('child_process').spawn
	var process = spawn('python3.5', ["./seleniumLogin.py", username, password]);

	// take standard out given by 'seleniumLogin.py' as 'data' variable in JSON type
	process.stdout.on('data', function(data){

		// parse 'data' variable and assign it into 'userData' variable
		userData = JSON.parse(data);
		
		userInfo = {
			"username" : username,
		"password" : password,
			"name" : userData.name,
			"grade" : userData.grade,
			"student_id" : userData.student_id,
			"user_department" : userData.user_department
		}
		// variable to check if userData is error JSON
		error = {'error':'true'}   

		// if userData is error JSON or does not have student number in it,
		// print out result.html with 'Login Failed!'
		// else connect to MongoDB and first check if there is same data in it,
		// print out result.html with 'Login Success!' if there is, and if not then
		// insert Data as Document into MongoDB and print out result.html with
		// 'Register and Login Success!'
		// at last Close MongoDB
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
		}
			
		else
			readHtml("login sucefulio",res);


	})
	})
});


// listen to port number '3004' and host address '0.0.0.0'
app.listen(3004, ()=>{
	console.log("server started");
});
