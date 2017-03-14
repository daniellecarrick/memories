//  packages & modules  >
var express = require('express');
var mongoose = require('mongoose');
var Memory = require("./models/memoryModel");
var bodyParser = require('body-parser');

var app = express();
mongoose.connect("mongodb://localhost/memoriesdb");

//  middleware  >
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('node_modules'));

//  api routes  >
app.get('/memoriesdb', function(req, res, next) {
  Memory.find(function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.post('/memoriesdb', function(req, res, next) {
  Memory.create(req.body, function(err, mem) {
    if (err) {
      console.error(err)
      return next(err);
    } else {
      res.json(mem);
    }
  });
});

//  run server  >
app.listen(8000, function() {
  console.log("Memory app started. Oof al ze!")
});
