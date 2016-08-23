var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.expression = '';
    $scope.x = '';
    $scope.calcular = function() {
        $scope.resultado = math.eval($scope.expression,{x: Number($scope.x)});
    }
});

// var expression = document.getElementById('expression');
// var evaluate   = document.getElementById('evaluate');
// var result     = document.getElementById('result');
// var x     = document.getElementById('x').value;
// evaluate.onclick = function () {
//   result.innerHTML = math.eval(expression.value,{x: Number(x)});
// };
