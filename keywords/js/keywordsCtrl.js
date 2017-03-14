app.controller('keywordsCtrl', function($scope, keywordsService) {

  //most importent function to get API 
  $scope.userLocation = keywordsService.userLocation;

  $scope.getLocationApi = keywordsService.getLocationApi;
    //console.log("im in controller");

});