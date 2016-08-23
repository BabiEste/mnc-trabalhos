var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.expression = '';
    $scope.x = '';
    $scope.calcular = function() {
        $scope.resultado = math.eval($scope.expression,{x: Number($scope.x)});
        try {
          functionPlot({
            target: '#plot',
            data: [{
              fn: $scope.expression,
              sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
              graphType: 'polyline'
            }]
          });
        }
        catch (err) {
          console.log(err);
          alert(err);
        }

      }
    });
