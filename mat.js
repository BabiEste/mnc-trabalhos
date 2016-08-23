var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  // // $scope.math = math.eval();
  // $scope.resultado = functio($scope.expression, $scope.x){
  //   x2 = $scope.x;
  //   exp = $scope.expression;
$scope.resultado = math.eval($scope.expression.value,{x: Number($scope.x)});
  //   return math.eval(exp.value, {x2:Number(x2)});
  }
});

// var expression = document.getElementById('expression');
// var evaluate   = document.getElementById('evaluate');
// var result     = document.getElementById('result');
// var x     = document.getElementById('x').value;
// evaluate.onclick = function () {
//   result.innerHTML = math.eval(expression.value,{x: Number(x)});
// };
