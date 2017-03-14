app.factory('kekywordsService', function($http){
    var posts = []; //USER

    var popular = []; //API 

    var moviesList = [ //HARDCODED
    {titleMovie:"Bambi", poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1NzM4NDg5MV5BMl5BanBnXkFtZTgwMjI1MTkzMjE@._V1_UX182_CR0,0,182,268_AL_.jpg', movieYear: 1942, plot: 'The story of a young deer growing up in the forest.', priceTag: Math.floor(Math.random() * (20-5) + 5)},
    {titleMovie:"Logan", poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1MjkzMjczMV5BMl5BanBnXkFtZTgwNDk4NjYyMTI@._V1_UX182_CR0,0,182,268_AL_.jpg', movieYear: 2017, plot: 'In the near future, a weary Logan cares for an ailing Professor X in a hide out',priceTag: Math.floor(Math.random() * (20-5) + 5)
},
    {titleMovie:"Fiding Nemo", poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZTAzNWZlNmUtZDEzYi00ZjA5LWIwYjEtZGM1NWE1MjE4YWRhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg', movieYear: 2003, plot: 'The story of a young deer growing up in the forest.',priceTag: Math.floor(Math.random() * (20-5) + 5)
},
    {titleMovie:"The Lion King", poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_UX182_CR0,0,182,268_AL_.jpg', movieYear: 1994, plot: 'A young lion Prince is cast out of his pride by his cruel uncle, who claims he',priceTag: Math.floor(Math.random() * (20-5) + 5)
},
    {titleMovie:"The Lion King", poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_UX182_CR0,0,182,268_AL_.jpg', movieYear: 1994, plot: 'A young lion Prince is cast out of his pride by his cruel uncle, who claims he',priceTag: Math.floor(Math.random() * (20-5) + 5)
},
    {titleMovie:"Bambi", poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1NzM4NDg5MV5BMl5BanBnXkFtZTgwMjI1MTkzMjE@._V1_UX182_CR0,0,182,268_AL_.jpg', movieYear: 1942, plot: 'The story of a young deer growing up in the forest.', priceTag: Math.floor(Math.random() * (20-5) + 5)
}

    ];  
  

   var addToCollection = function(newMovie){
     console.log('from the service')
     console.log(newMovie);
     userCollection.push(newMovie);
  };

  var removeFromList = function (index) {
    userCollection.splice(index, 1); 
    console.log(index); 
  };

  //this function gets movie Title and then it easy to mine the data
  var searchMovie = function(movieTitle){
    console.log('got to search movie')

    $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?t=' + movieTitle  //s= will show an array
    }).then(function (response) {
          console.log('im working')
          console.log(response)
          var titleMovie = response.data.Title;
          var plot = response.data.Plot;
          var movieYear = response.data.Year;
          var actors = response.data.Actors;
          var poster = response.data.Poster;
          var priceTag = Math.floor(Math.random() * (20-5) + 5); //math.random

          console.log(titleMovie,plot,actors,poster,priceTag);
          console.log(movieYear);

          var movieInfo = {
            titleMovie:titleMovie,
            plot:plot,
            movieYear:movieYear,
            actors:actors,
            poster:poster,
            priceTag:priceTag
          };

          console.log(movieInfo);
          addMovie(movieInfo);
          return movieInfo;

      }, function errorCallback(response) {
          alert("please fill in correct name");
      });
  }//end of searchmovie
    
    //takes the "real" object API and pushes it onto NEW popular array 
    var addMovie = function (movieInfo) {
          popular.push(movieInfo); //object.property.push(object)
          console.log(popular);
    };


    return { 
      moviesList: moviesList,
      userCollection:userCollection,
      addToCollection: addToCollection,
      removeFromList:removeFromList,
      searchMovie: searchMovie,
      addMovie:addMovie,
      popular:popular
    };

});

//services store data
//we construct them like controller. there are 2 kinds: service and factory.
//The function in a factory does not involve $scope - that's typically used for controllers
