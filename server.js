var express = require("express");
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017/userInfo';

var insertDocuments = function(db, query, callback){
  var collection = db.collection('accounts');
  collection.insertOne(query, function(err,result){
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted one account into 'accounts' collection");
    callback(result);
  });
}

var findDocumentsQuery = function(db, id, ps, callback){
  var collection = db.collection('accounts');

  collection.findOne(id, function(err, account){
    if(err) throw err;

    if(account ==null){
      callback('Such account does not exist!');
    } else if (ps == account.password){
      callback('Log In Success!');
    } else {
      callback('Wrong Password!');
    }

  });
}

var checkDocumentsQuery = function(db, id, callback){
  var collection = db.collection('accounts');

  collection.findOne(id, function(err, account){
    if (err) throw err;

    if(account == null){
      callback(false);
    } else {
      callback(true);
    }
  });
}
//encoded된 데이터를 받기위해서 middleware를 지정해준다. [Post로 받아온 encoded된 데이터를 읽을 수 있도록 한다.]
app.use(express.json());
app.use(express.urlencoded());



//login page와 register page 여는 루트핸들러 만들기(get형식 사용)
app.get('/loginpage', function(req, res){
  res. sendFile(path.join(__dirname + '/login.html'));
});

app.get('/registerpage', function(req, res){
  res.sendFile(path.join(__dirname + '/register.html'));
});



app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  var idQuery = {};
  idQuery['username'] = username;

  MongoClient.connect(url, function(err, db){
    assert.equal(err, null);
    console.log("Successfully connectied to userInfo DB");
    findDocumentsQuery(db, idQuery, password, function(result){
      var html = fs.readFile('./result.html', function(err,html){
        html = " "+html;
        html = html.replace("<%RESULT%>", result);

        res.set('Contet-Type', 'text/html');
        res.send(html);
      });
      db.close();
    });
  });
});

app.post('/register', function(req, res){
  var query = req.body; //post방식에서는 req.query가 아니라 req.body로 받는다.

  var idQuery = {};
  idQuery['username'] = query.username;

  MongoClient.connect(url, function(err,db){
    assert.equal(err, null);
    console.log("Succesfully connectied to userInfo DB");
    checkDocumentsQuery(db, idQuery, function(result){
      if (result == false){
        insertDocuments(db, query, function(){
          var html = fs.readFile('./result.html', function(err, html){
            html = " " + html;
            html = html.replace("<%RESULT%>", "Register Complete!");

            res.set('Content-Type', 'text/html');
            res.send(html);
          });
          db.close();
        });
      } else {
        var html = fs.readFile('./result.html', function(err, html){
          html = " " + html;
          html = html.replace("<%RESULT%>", "Account already exists!");

          res.set('Content-Type', 'text/html');
          res.send(html);
        });
        db.close();
      }
    });
  });
});

app.listen(2000, ()=>{
  console.log("server started at http://localhost:2000");
});
