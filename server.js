var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));

var db = mongojs(process.env.MONGODB_URL, ['contacts']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contacts', function(req, res) {
	db.contacts.find(function(err, docs) {
		res.json(docs);
	});
});

app.post('/contacts', function(req, res) {
	db.contacts.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/contacts/:id', function(req, res) {
	var id = req.params.id;
	db.contacts.remove({
		_id: mongojs.ObjectId(id)
	}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contacts/:id', function(req, res) {
	var id = req.params.id;
	db.contacts.findOne({
		_id: mongojs.ObjectId(id)
	}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contacts/:id', function(req, res) {
	var id = req.params.id;
	db.contacts.findAndModify({
		query: {
			_id: mongojs.ObjectId(id)
		},
		update: {
			$set: {
				name: req.body.name,
				email: req.body.email,
				phone: req.body.phone
			}
		},
		new: true
	}, function(err, doc) {
		res.json(doc);
	});
});

var server = app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});