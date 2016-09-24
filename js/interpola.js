var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.n = 1;
  $scope.xi=[];
  $scope.fi=[];
  $scope.i=[];
  $scope.xi[0]=0;
  $scope.fi[0]=0;
  $scope.i[0]=0;
  $scope.addRecipient = function() {
    if($scope.i.length === 0 ){
    $scope.i.push(0);
    }
    else {
    $scope.i.push($scope.i[($scope.i.length-1)]+1);

    }
    console.log($scope.i[$scope.i.length-1]);
    console.log($scope.expression[$scope.expression.length-1]);
    $scope.n++;
  };

  $scope.deleteRecipient = function() {
    $scope.i.pop();
    
    $scope.n--;
  };

});
