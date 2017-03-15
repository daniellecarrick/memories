app.controller('mainController', function($scope, memFactory) {

  $scope.addMem = function(newMem) {
    //&& $scope.posNeg && $scope.age && $scope.location
   // if($scope.age > 0){
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
    // }else{alert("please fill in the fields");}
  };



  memFactory.getMems().then(function(memoriesdb) {
    $scope.memoriesdb = memoriesdb;
  });
});
