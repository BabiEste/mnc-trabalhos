// // basic usage of math.js
// //
// // website:  http://mathjs.org
// // docs:     http://mathjs.org/docs
// // examples: http://mathjs.org/examples
//
// // functions and constants
// // print(math.round(math.e, 3));            // 2.718
// // print(math.atan2(3, -3) / math.pi);      // 0.75
// print(math.eval(eq));               // 3
// // print(math.sqrt(-4));                    // 2i
// // print(math.pow([[-1, 2], [3, 1]], 2));   // [[7, 0], [0, 7]]
// //
// // // expressions
// // print(math.eval('12 / (2.3 + 0.7)'));    // 4
// // print(math.eval('5.08 cm to inch'));     // 2 inch
// // print(math.eval('9 / 3 + 2i'));          // 3 + 2i
// // print(math.eval('det([-1, 2; 3, 1])'));  // -7
// var a = document.getElementById('eq').value;
// // // chaining
// // var a = math.chain(3)
// //     .add(4)
// //     .multiply(2)
// //     .done();
// // print(a); // 14
//
// // helper function to output formatted results.
// function print(value) {
//   var precision = 14;
//   document.write(math.format(value, precision) + '<br>');
// }
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
// // pointers to the input elements
// var expression = document.getElementById('expression');
// var evaluate   = document.getElementById('evaluate');
// var result     = document.getElementById('result');
// var x     = document.getElementById('x').value;
// var node2 = math.parse('b^a', scope);
// var code2 = node2.compile();
// var scope = {
//     b: 3,
//     a: 2
// };
// var yo =code2.eval(scope); // 9
// print(yo);

// evaluate.onclick = function () {
//   result.innerHTML = math.eval(expression.value,{x: Number(x)});
// };
