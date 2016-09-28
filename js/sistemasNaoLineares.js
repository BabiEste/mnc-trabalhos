var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.i=[];$scope.x=[];$scope.x[0]=0;$scope.i[0]=0;$scope.expression=[]; $scope.j=[];$scope.j[0]=0;$scope.expression[0]="x^2";$scope.ep=0.01;
  $scope.jacobiMatrix=[];

  $scope.addRecipient = function() {
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

  $scope.deleteRecipient = function() {
    $scope.i.pop();

  };
  var hCalculator = function () {

  };
  $scope.jacobiCalculator = function (){
    for (var j = 0; j < $scope.i.length; j++) {
      $scope.jacobiMatrix[j] =[];
      for(var s = 0; s < $scope.i.length ; s++){
        $scope.jacobiMatrix[j][s] = $scope.jacobiParcialPrimeira($scope.expression[j],s);
      }
        console.log($scope.jacobiMatrix[0]);
        console.log($scope.jacobiMatrix[1]);
        console.log($scope.jacobiMatrix[2]);
    }
  };
  $scope.jacobiParcialPrimeira = function(expression,what){
    var h = 1000*$scope.ep;
    var xi,f1,f2,p,q;
    xi = $scope.x[what];
    $scope.x[what] = xi-(-h);
    f1 = math.eval(expression,{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});
    $scope.x[what] = xi-h;
    f2 = math.eval(expression,{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});
    p = (f1-f2)/(2*h);
    for (var j = 0; j < 10; j++) {
      q = p;
      h = h/2;
      $scope.x[what] = xi-(-h);
      f1 = math.eval(expression,{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});
      $scope.x[what] = xi-h;
      f2 = math.eval(expression,{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});
      p = (f1-f2)/(2*h);
      if(Math.abs(p-q)<=$scope.ep){
        $scope.x[what]=xi;
        return p;

      }
    }
    $scope.x[what]=xi;
    return p;

  };

  
});
