app.controller('mainController', function($scope, memFactory) {

  $scope.addMem = function(newMem) {
      memFactory.addMem(newMem).then(function(mem) {
      $scope.memoriesdb.push(mem);
      console.log(mem.body, mem.age);
    });
      //clearing fields but not on view
      $scope.body="";
      $scope.posNeg="";
      $scope.age="";
      $scope.location="";

      console.log($scope.body, $scope.posNeg);  
  };



  memFactory.getMems().then(function(memoriesdb) {
    $scope.memoriesdb = memoriesdb;
  });
});
