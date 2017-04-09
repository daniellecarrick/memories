//  packages & modules  >
var express = require('express');
var mongoose = require('mongoose');
var Memory = require("./models/MemoryModel");
var bodyParser = require('body-parser');

var app = express();
//mongoose.connect("mongodb://localhost/memoriesdb");
mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/memoriesdb');

//  middleware  >
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

//  API routes  >
app.get('/uniqueLocs', function(req, res, next) {
  Memory.distinct('location', function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/memoriesdb', function(req, res, next) {
  console.log(req.query);
  // set default values
  var minAge = req.query.minAge || 0;
  var maxAge = req.query.maxAge || 100;
  var minSentiment = req.query.minSentiment || 0;
  var maxSentiment = req.query.maxSentiment|| 10;

  Memory.find({'age': {$gt: minAge, $lt: maxAge}, 'posNeg': {$gt: minSentiment, $lt: maxSentiment}},  function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

/*app.get('/test', function (req, res){
  res.send('hey')
})*/
app.post('/memoriesdb', function(req, res, next) {
  Memory.create(req.body, function(err, mem) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      console.log(mem);
      res.json(mem);
    }
  });
});

//  run server  >
app.listen(process.env.PORT || '8080');

//for right now just keep this commented, depend on the 'static' stuff [^.]+ will accept any string without a dot thereby ignoring file names
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
});
