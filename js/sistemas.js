var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.receivers = [[""],[""]];

  // TABLE
  $scope.addRecipient = function(receiver) {
      for(var j = $scope.receivers[0].length; j<$scope.ordem; j++) {
        $scope.receivers[j].push("");
        break;

    }
  };

  $scope.deleteRecipient = function() {
    for(var i=0; i<$scope.receivers.length; i++) {
      $scope.receivers.splice(i, 1);
      break;

    }
  };


});
