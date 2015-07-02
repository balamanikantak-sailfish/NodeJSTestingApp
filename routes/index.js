var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sailfish Digital Media Solution Pvt. Ltd.' });
});

router.post('/Login', function(req, res, next) {
  var username = req.param('username');
  var password = req.param('password');
  if(username == 'mani' && password == '123456')
  {
    res.render('Admin/Home',{ title: 'Home',layout : 'Adminlayout',uname:username,pass:password });
  }
  else
  {
    res.render('Admin/Login',{ title: 'Login failed /Invalid Username & Password.',layout : 'Adminlayout'});
  }
});


router.get('/Insert', function(req, res, next) {
    res.render('Admin/Insert',{ title: 'Registration',layout : 'Adminlayout'});
});


router.get('/Find', function(req, res, next) {
    //res.render('Insert',{ title: 'Registration'});

    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert')
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost:27017/sailfish';

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        var insertresult = "";
         var docdata = [];
        var cursor =db.collection('Users').find();
        cursor.each(function(err, doc) {

            if (doc != null) {
                console.log("select Query console :"+ JSON.stringify(doc));
                 docdata.push(JSON.stringify(doc));
                console.log("select :"+ JSON.stringify(docdata));
                // callback("select Query "+ i +":"+ JSON.stringify(doc));

            } else {
                //callback("Select Users error");
            }

        });

        res.render('Admin/FindData',{ title: 'Registration',layout : 'Adminlayout',resdata:docdata});
    });




});


router.post('/registration', function(req, res, next) {
  var email = req.param('email');
  var username = req.param('username');
  var password = req.param('password');
  var datastore = req.body;
  var MongoClient = require('mongodb').MongoClient;
  var assert = require('assert')
  var ObjectId = require('mongodb').ObjectID;
  var url = 'mongodb://localhost:27017/sailfish';

    MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
     var insertresult = "";
      insertDocument(db, datastore,function(err,success)
     {
         insertresult = "Inserted";
     });
      if(insertresult == "Inserted")
      {
          res.render('Testing', {title: 'Testing data', email: email, uname: username, pass: password, reqdata: req});

      }
      else
      {
          res.render('Login',{ title: 'Registration Failed.'});
      }

      var cursor =db.collection('Users').find();
      var i = 0;
    cursor.each(function(err, doc) {

      if (doc != null) {
        console.log("select Query console "+ i +":"+ JSON.stringify(doc));
         // callback("select Query "+ i +":"+ JSON.stringify(doc));
          i = i+1;
      } else {
        //callback("Select Users error");
      }

    });


  });

});


module.exports = router;





 function insertDocument(db,data,callback)
{
    var result = "";
    //console.log("db data :"+ JSON.stringify(data));
    db.collection('Users').insertOne(data, function(err, result) {
        result = "Inserted";
    });
    callback(result);
};

var SelectUsers = function(db, callback) {
  var cursor =db.collection('Users').find();
  cursor.each(function(err, doc) {
    if (doc != null) {
      console.log("result query");
      return doc;
    } else {
      callback("Select Users error");
    }
  });
};



var deleteUsers = function(db, callback) {
  var cursor =db.collection('Users').deleteMany();
};






/*


 MongoClient.connect(url, function (err, db) {
 assert.equal(null, err);
 var mm = SelectUsers(db, function (doc) {
 db.close();
 });
 });


 MongoClient.connect(url, function (err, db) {
 assert.equal(null, err);
 var nn = deleteUsers(db, function () {
 db.close();
 });
 });


 MongoClient.connect(url, function(err, db) {
 assert.equal(null, err);
 insertDocument(db, function() {
 db.close();
 });
 });

*/
/*


var insertDocument = function(db,req, callback)
{
  console.log(req);
  db.collection('Users').insertOne( {
    userid : 1,
    username : "maniadmin",
    password:""
  }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

var findRestaurants = function(db, callback) {
  var cursor =db.collection('restaurants').find( );
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
    db.close();
  });
});
*/