var express = require('express');
var app = express();
/*
var mongoose = require('mongoose');
var Goal = require("./models/memoriesModel");
mongoose.connect("mongodb://localhost/memoriesdb"); //database name*/

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8000, function() {
  console.log("Memory app started. Oof al ze!")
});