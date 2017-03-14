var express = require('express');
var app = express();

var mongoose = require('mongoose');
var Memory = require("./models/memoryModel");
mongoose.connect("mongodb://localhost/memoriesdb");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

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

app.listen(8000, function() {
  console.log("Memory app started. Oof al ze!")
});
