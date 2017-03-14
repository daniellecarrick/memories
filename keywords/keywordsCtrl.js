app.controller('keywordsCtrl', function($scope, anguflixService) {

  $scope.posts = keywordsService.posts;
  $scope.movieTitleFilter; //for filter
  $scope.userBudget = 100; //initialize budget!
  $scope.userCollection = anguflixService.userCollection;
  $scope.emptyCollection = true; //show h3

  //most importent function to get API 
  $scope.searchMovie = anguflixService.searchMovie;
  //takes movie and send it to service

  //array of API movies
  $scope.popular = anguflixService.popular;
  
  $scope.addToCollection = function(newMovie){
    //scanning the array
    for(var i = 0; i < anguflixService.userCollection.length; i++) {
    //checks if movie exists in array
      if(newMovie === anguflixService.userCollection[i]) {
        alert("movie is already in list");
        return;
    //if movie exists than alert and abort    
      } 
    };

    //the else happens OUTSIDE the loop and only THAN adds the new movie to array 
    $scope.emptyCollection = false; //hide h3
    anguflixService.addToCollection(newMovie); //invoke service function 
    console.log($scope.userCollection);
    if($scope.userBudget > 0){
       $scope.userBudget -= 10;
    }else{alert("you're out of money!")}
    console.log($scope.userBudget);

    };
   
  $scope.removeFromList = function(index){
      anguflixService.removeFromList(index);
      console.log($scope.userCollection);

      if(anguflixService.userCollection.length === 0){
        $scope.emptyCollection = true;
      };





      
  }



});