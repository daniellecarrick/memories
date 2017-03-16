app.factory('memFactory', function($http) {

    var memFactory = {};

//  get all the memories:
    memFactory.getMems = function(minAge, maxAge) {
        return $http.get('/memoriesdb', { params: { minAge: minAge, maxAge: maxAge } })
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

//  unique locations:

    memFactory.getUniqueLocs = function() {
        return $http.get('/uniqueLocs')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

//  memories by quality:
/*
    memFactory.getPosMems = function() {
        return $http.get('/posMems')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getNegMems = function() {
        return $http.get('/mems?negMems=6')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

//  age groupings:

    memFactory.getChildhood = function() {
        return $http.get('/childhood')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getTeens = function() {
        return $http.get('/teens')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getTwenties = function() {
        return $http.get('/twenties')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getThirties = function() {
        return $http.get('/thirties')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getForties = function() {
        return $http.get('/forties')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getFifties = function() {
        return $http.get('/fifties')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getSixtyPlus = function() {
        return $http.get('/sixtyPlus')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };*/

//  share memories:

    memFactory.addMem = function(newMem) {
        return $http.post('/memoriesdb', newMem)
            .then(function(response) {
                return response.data
            }, function(err) {
                console.error(err)
            });
    };

    return memFactory;
});
