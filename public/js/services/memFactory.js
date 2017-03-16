app.factory('memFactory', function($http) {

    var memFactory = {};

    memFactory.getMems = function() {
        return $http.get('/memoriesdb')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getUniqueLocs = function() {
        return $http.get('/uniqueLocs')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getPosMems = function() {
        return $http.get('/posMems')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

    memFactory.getNegMems = function() {
        return $http.get('/negMems')
            .then(function(response) {
                return response.data
            }, function(err) {});
    };

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
