app.controller('mainController', function($scope, memFactory) {
    $scope.thanks = false; //hides thank you

    // default form variables
/*    $scope.maxPosMem = 10;
    $scope.minPosMem = 0;*/
    $scope.minAge = 0;
    $scope.maxAge = 100;

    $scope.setAgeMinMax = function(min, max) {
        $scope.minAge = min;
        $scope.maxAge = max;
        console.log($scope.minAge, $scope.maxAge);
        // make request to API to get memories for specified age range
        // then show the new memories on the page
        // need to use a callback to update memoriesdb with filtered memories because it's asynchronous
        memFactory.getMems(min, max).then(function (filteredMemories) {
            $scope.memoriesdb = filteredMemories;
        });
    }

    $scope.displayPosMem = function(){
        $scope.maxPosMem = 10;
        $scope.minPosMem = 6;
        //var filterMem = $scope.posMems;
        console.log($scope.maxPosMem, $scope.minPosMem);
    };

    $scope.displayNegMem = function(){
        $scope.maxPosMem = 5;
        $scope.minPosMem = 1;
        //var filterMem = $scope.negMems;
        console.log(filterMem);
    };

    $scope.addMem = function(newMem) {
        //&& $scope.posNeg && $scope.age && $scope.location
        // if($scope.age > 0){
        memFactory.addMem(newMem).then(function(mem) {
            $scope.thanks = true;
            $scope.memoriesdb.push(mem);
            $scope.thanks = true; //reveals thankyou
            console.log(mem.body, mem.age);
        });
        //clearing fields but not on view
        $scope.body = "";
        $scope.posNeg = "";
        $scope.age = "";
        $scope.location = "";

        console.log($scope.body, $scope.posNeg);
        // }else{alert("please fill in the fields");}
    };

    memFactory.getMems($scope.minAge, $scope.maxAge).then(function(memoriesdb) {
        $scope.memoriesdb = memoriesdb;
    });

    memFactory.getUniqueLocs().then(function(uniqueLocs) {
        $scope.uniqueLocs = uniqueLocs;
    });


});
