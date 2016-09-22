var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.i=[];
  $scope.x=[];
  $scope.x[0]=0;
  $scope.i[0]=0;
  $scope.expression=[];
  $scope.j=[];
  $scope.j[0]=0;
  $scope.expression[0]="x^2";

  $scope.addRecipient = function(receiver) {
    $scope.receivers.push({value:""});
  };

  $scope.deleteRecipient = function(receiver) {
    for(var i=0; i<$scope.receivers.length; i++) {
        $scope.receivers.splice(i, 1);
        break;

    }
  };

  $scope.addRecipientJ = function() {
    if($scope.i.length === 0 ){
    $scope.i.push(0);
    $scope.j.push(0);
    }
    else {
    $scope.i.push($scope.i[($scope.i.length-1)]+1);

    }
    console.log($scope.i[$scope.i.length-1]);
    console.log($scope.expression[$scope.expression.length-1]);
  };

  $scope.deleteRecipientJ = function() {
    for(var i=0; i<$scope.i.length; i++) {
        $scope.i.splice(i, 1);
        break;

    }
  };

});
