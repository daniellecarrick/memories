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

app.get('/posMems', function(req, res, next) {
  Memory.find({'posNeg': {$gt: '5'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/negMems', function(req, res, next) {
  Memory.find({'posNeg': {$lt: '6'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/childhood', function(req, res, next) {
  Memory.find({'age': {$lt: '13'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/teens', function(req, res, next) {
  Memory.find({'age': {$lt: '20', $gt: '12'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/twenties', function(req, res, next) {
  Memory.find({'age': {$lt: '30', $gt: '19'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/thirties', function(req, res, next) {
  Memory.find({'age': {$lt: '40', $gt: '29'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/forties', function(req, res, next) {
  Memory.find({'age': {$lt: '50', $gt: '39'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/fifties', function(req, res, next) {
  Memory.find({'age': {$lt: '60', $gt: '49'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

app.get('/sixtyPlus', function(req, res, next) {
  Memory.find({'age': {$gt: '59'}}, function(error, mem) {
    if (error) {
      console.error(error)
      return next(error);
    } else {
      res.send(mem);
    }
  });
});

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
