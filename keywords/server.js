//  packages & modules  >
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

//  run server  >
app.listen(8080, function() {
  console.log("cities test")
});
