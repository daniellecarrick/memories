app.controller('mainController', function($scope, memFactory) {
    $scope.thanks = false; //hides thank you

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

    memFactory.getMems().then(function(memoriesdb) {
        $scope.memoriesdb = memoriesdb;
    });

    memFactory.getUniqueLocs().then(function(uniqueLocs) {
        $scope.uniqueLocs = uniqueLocs;
    });

// positive and negative memory scopes:

    memFactory.getPosMems().then(function(posMems) {
        $scope.posMems = posMems;
    });

    memFactory.getNegMems().then(function(negMems) {
        $scope.negMems = negMems;
    });

// age grouping scopes:

memFactory.getChildhood().then(function(childhood) {
    $scope.childhood = childhood;
});

memFactory.getTeens().then(function(teens) {
    $scope.teens = teens;
});

memFactory.getTwenties().then(function(twenties) {
    $scope.twenties = twenties;
});

memFactory.getThirties().then(function(thirties) {
    $scope.thirties = thirties;
});

memFactory.getForties().then(function(forties) {
    $scope.forties = forties;
});

memFactory.getFifties().then(function(fifties) {
    $scope.fifties = fifties;
});

memFactory.getSixtyPlus().then(function(sixtyPlus) {
    $scope.sixtyPlus = sixtyPlus;
});

});
