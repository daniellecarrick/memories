app.controller('mainController', function($scope, memFactory) {

  $scope.addMem = function(newMem) {
    memFactory.addMem(newMem).then(function(mem) {
      $scope.memoriesdb.push(mem);
    });
  }

  memFactory.getMems().then(function(memoriesdb) {
    $scope.memoriesdb = memoriesdb;
  });
});
