var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.i=[];$scope.i[0]=0;$scope.i[1]=1;$scope.i[2]=2;$scope.j=[];$scope.j[0]=0;$scope.j[1]=1; $scope.j[2]=2;$scope.j[3]=3;
  $scope.matrixMain = [[],[]];
  $scope.b=[];
  $scope.x=[];
  // TABLE
  $scope.addRecipient = function() {
    if($scope.i.length === 0 ){
      $scope.i.push(0);
    }
    else if($scope.i.length<3){
      $scope.i.push($scope.i[($scope.i.length-1)]+1);
      $scope.j.push($scope.j[($scope.j.length-1)]+1);

    }
    console.log($scope.i[$scope.i.length-1]);
  };

  $scope.deleteRecipient = function() {
    if($scope.j.length>1){
      $scope.j.pop();
      $scope.i.pop();
    }
  };
  $scope.triangulo = function () {
    var m;
    console.log($scope.j.length);
    for (var j  = 0; j < $scope.i.length-1; j++) {
      for (var i = j+1; i < $scope.i.length; i++) {
        try {
          m = $scope.matrixMain[i][j]/$scope.matrixMain[j][j];
        } catch (e) {
          alert("Error");
        }

        for (var k = j; k < $scope.i.length; k++) {
          $scope.matrixMain[i][k] = $scope.matrixMain[i][k] - m*$scope.matrixMain[j][k];

        }
        $scope.b[i] = $scope.b[i] - m*$scope.b[j];
      }
    }
    $scope.x = tSolution();
  };

  var tSolution = function(){
    var x = [],soma =0;
    x[$scope.i.length - 1] = $scope.b[$scope.i.length - 1]/$scope.matrixMain[$scope.i.length - 1][ $scope.i.length - 1];
    for (var i = $scope.i.length - 1; i >=0 ; i--) {
      soma = 0;
      for (var j = i+1; j <   $scope.i.length; j++) {
        soma += $scope.matrixMain[i][j]*x[j];
      }
      x[i] = round(($scope.b[i]-soma)/$scope.matrixMain[i][i]);
    }
    console.log(x);
    return x;
  };

  var round = function(number){
    number = number * 100000;
    if((number - Math.round(number)) <= 0.00001){
      return Math.round(number)/100000;
    }

    else return number/100000;
  };
  $scope.limpa =function () {
    $scope.matrixMain = [[],[]];
    $scope.b=[];
    $scope.x=[];
  };
});
