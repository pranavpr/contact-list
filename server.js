var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contacts', ['contacts']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contacts', function (req, res) {
	db.contacts.find(function (err, docs) {
	res.json(docs);
	});
});

app.post('/contacts', function (req, res) {
	db.contacts.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/contacts/:id', function (req, res) {
	var id = req.params.id;
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});
app.get('/contacts/:id', function (req, res) {
	var id = req.params.id;
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
	res.json(doc);
	});
});
var server = app.listen(3000, function () {
	console.log('Listening on port 3000');
});