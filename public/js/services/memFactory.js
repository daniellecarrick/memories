app.factory('memFactory', function($http) {

    var memFactory = {};

//  get all the memories:
    memFactory.getMems = function(minAge, maxAge, minSentiment, maxSentiment) {
        return $http.get('/memoriesdb', { params: { minAge: minAge, maxAge: maxAge, minSentiment: minSentiment, maxSentiment: maxSentiment} })
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
