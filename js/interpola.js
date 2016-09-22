var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {

$scope.receivers=[{value:""}];
$scope.receiversJ=[{value:""}];
$scope.receiversJF=[{value:""}];

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
  $scope.receiversJ.push({value:""});
  $scope.receiversJF.push({value:""});
};

$scope.deleteRecipientJ = function() {
  for(var i=0; i<$scope.receiversJ.length; i++) {
      $scope.receiversJ.splice(i, 1);
      $scope.receiversJF.splice(i, 1);
      break;

  }
};

});
