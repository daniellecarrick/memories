app.controller('mainController', function($scope, memFactory) {
    $scope.thanks = false; //hides thank you
    $scope.mailLink = "mailto:" + $scope.emailId + "?subject=" + $scope.Subject + '&body=' + $scope.mailContent;
    // default form variables
    $scope.maxPosMem = 10;
    $scope.minPosMem = 0;
    $scope.minAge = 0;
    $scope.maxAge = 100;

    $scope.setAgeMinMax = function(min, max) {
        $scope.minAge = min;
        $scope.maxAge = max;
        console.log($scope.minAge, $scope.maxAge);
        // make request to API to get memories for specified age range
        // then show the new memories on the page
        // need to use a callback to update memoriesdb with filtered memories because it's asynchronous
        memFactory.getMems(min, max, $scope.minPosMem, $scope.maxPosMem).then(function (filteredMemories) {
            $scope.memoriesdb = filteredMemories;
        });
    }
    // for some reason sentiment is being passed as age
    $scope.displaySentiment = function(min, max){
        $scope.maxPosMem = max;
        $scope.minPosMem = min;
        console.log($scope.maxPosMem, $scope.minPosMem);
        //var filterMem = $scope.posMems;
        memFactory.getMems($scope.minAge, $scope.maxAge, min, max).then(function (filteredMemoriesSentiment) {
            $scope.memoriesdb = filteredMemoriesSentiment;
        });
    };

    $scope.addMem = function(newMem) {
        //&& $scope.posNeg && $scope.age && $scope.location
        // if($scope.age > 0){
        memFactory.addMem(newMem).then(function(mem) {
            $scope.thanks = true;
            $scope.memoriesdb.push(mem);
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

    memFactory.getMems($scope.minAge, $scope.maxAge, $scope.minPosMem, $scope.maxPosMem).then(function(memoriesdb) {
        $scope.memoriesdb = memoriesdb;
    });

    memFactory.getUniqueLocs().then(function(uniqueLocs) {
        $scope.uniqueLocs = uniqueLocs;
    });


});
