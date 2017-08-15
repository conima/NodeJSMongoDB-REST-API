var express = require('express');
var app = express();
var mongojs = require('mongojs');
var ObjectId = require('mongodb').ObjectID; 
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/companylist";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.post('/companylist/company', function(req, res)	{
	console.log(req.body);
	var count = null;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("company").insertOne(req.body, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		});
		db.close();
	});
});

app.get('/companylist/company', function(req, res)	{
	console.log("Received a GET request");
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("company").find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		db.close();
		res.json(result);
	  });
	});
	
});

app.post('/companylist/person', function(req, res)	{
	console.log(req.body);
	var count = null;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("person").insertOne(req.body, function(err, res) {
			if (err) throw err;
				console.log("1 document inserted");
		});
		db.close();
	});
});

app.get('/companylist/person', function(req, res)	{
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("person").find({}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result);
		res.json(result);
	  });
	  db.close();
	});
	
});

app.delete('/companylist/person/:id', function(req, res)	{
	var id = req.params.id;
	console.log(id);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("person").remove({_id: mongojs.ObjectId(id)}, function(err, doc)	{
			if (err) throw err;
			res.json(doc);
		});
		db.close();
	});
});

app.get('/companylist/company/:id', function(req, res)	{
	var id = req.params.id;
	console.log(id);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("company").findOne({_id: mongojs.ObjectId(id)}, function(err, doc)	{
			if (err) throw err;
			res.json(doc);
		});
		db.close();
	});
});

app.put('/companylist/company/:id', function(req, res)	{
	var id = req.params.id;
	console.log(req.body.name);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("company").update({_id: ObjectId(id)},
		{$set: {name: req.body.name, address: req.body.address, revenue: req.body.revenue, phone: req.body.phone}},
		function (err, doc) {
		  res.json(doc);
		}); 
		db.close();
	});
});

app.get('/companylist/person/:id', function(req, res)	{
	var id = req.params.id;
	console.log(id);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("person").findOne({_id: mongojs.ObjectId(id)}, function(err, doc)	{
			if (err) throw err;
			res.json(doc);
		});
		db.close();
	});
});

app.put('/companylist/person/:id', function(req, res)	{
	var id = req.params.id;
	console.log(req.body.name);
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		db.collection("person").update({_id: ObjectId(id)},
		{$set: {name: req.body.name, email: req.body.email, company: req.body.company}},
		function (err, doc) {
		  res.json(doc);
		}); 
		db.close();
	});
});

app.listen(3000);
console.log("Server running on port 3000");