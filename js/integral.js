var app = angular.module('myApp', []);

var x = [];
app.controller('myCtrl', function($scope) {
  $scope.Trapezio = function(what){
    var h = ($scope.b-$scope.a)/$scope.n;
    var trapezio1=0, trapezio2=0;
    var trapezioMain = 0;
    console.log(h);
    for (var i = 0; i <= $scope.n ; i++) {
      x.push(Number($scope.a) + i*h);

      if(i < $scope.n)
      trapezio1 += math.eval($scope.expression,{x: Number(x[i])});

      if(i>0)
      trapezio2 += math.eval($scope.expression,{x: Number(x[i])});

      if(i>0 && i<$scope.n)
      trapezioMain += math.eval($scope.expression,{x: Number(x[i])});
    }

    trapezio2 = trapezio2*h;
    $scope.trapezio2Resultado= trapezio2;

    trapezio1 = trapezio1*h;
    $scope.trapezio1Resultado= trapezio1;

    var xZero=math.eval($scope.expression,{x: Number(x[0])});
    var xN = math.eval($scope.expression,{x: Number(x[$scope.n])});
    trapezioMain = (xZero+(2*trapezioMain)+xN)*(h/2);
    console.log(trapezio1);
    console.log(trapezio2);
    for (var q = 0; q <= $scope.n; q++) {
      x.pop();
    }
    $scope.plot();
    var resultado;
    if (what === 3) {
      resultado = trapezioMain;
    }
    else if (what === 2) {
      resultado = trapezio2;
    }
    else if (what === 1) {
      resultado = trapezio1;
    }
    return resultado;
  };

  $scope.simpsonOne = function(){
    var h = ($scope.b-$scope.a)/$scope.n;
    var somaUm = 0 , somaDois = 0 ;
    var resultado = 0;
    var boo = false;
    if ($scope.n%2 !== 0) {
      var x0Aux = math.eval($scope.expression,{x: Number($scope.b-h)});
      var xnAux = math.eval($scope.expression,{x: Number($scope.b)});
      var aux = (h/2)*(x0Aux+xnAux);
      $scope.n = $scope.n -1;
      resultado = resultado + aux;
      boo = true;
    }
    console.log(h);
    for (var i = 0; i <= $scope.n ; i++) {
      x.push(Number($scope.a) + i*h);
      if(i>=1 && (i <= $scope.n-1) && (i%2 !== 0))
      somaUm += math.eval($scope.expression,{x: Number(x[i])});

      if( (i>=2) && (i <= $scope.n - 2) && (i%2 === 0))
      somaDois += math.eval($scope.expression,{x: Number(x[i])});
      console.log("["+i+"]" + math.eval($scope.expression,{x: Number(x[i])}));
    }

    var fxZero=math.eval($scope.expression,{x: Number(x[0])});
    var fxN = math.eval($scope.expression,{x: Number(x[$scope.n])});
    somaUm = 4*somaUm;
    somaDois = 2*somaDois;
    resultado =resultado+((h/3)*(fxZero+(somaUm)+(somaDois)+fxN));
    for (var q = 0; q <= $scope.n; q++) {
      x.pop();
    }
    $scope.plot();
    if(boo === true)
    $scope.n ++;

    return resultado;
  };

  $scope.simpsonThree = function(){
    var boo = false;
    if ($scope.n%3 !== 0) {
      $scope.n = 3*$scope.n;
      boo = true;
    }

    var h = ($scope.b-$scope.a)/$scope.n;
    var somaUm = 0 , somaDois = 0 ;
    var resultado = 0;


    for (var i = 0; i <= $scope.n ; i++) {
      x.push(Number($scope.a) + i*h);
      if(i>=3 && (i%3 === 0) && (i <= $scope.n-3))
      somaDois += math.eval($scope.expression,{x: Number(x[i])});

      else if( i>=1 && i%3 !== 0 &&(i <= $scope.n -1))
      somaUm += math.eval($scope.expression,{x: Number(x[i])});
      console.log("["+i+"]" + math.eval($scope.expression,{x: Number(x[i])}));
    }

    var fxZero=math.eval($scope.expression,{x: Number(x[0])});
    var fxN = math.eval($scope.expression,{x: Number(x[$scope.n])});
    somaUm = 3*somaUm;
    somaDois = 2*somaDois;
    resultado =resultado+(3*(h/8)*(fxZero+(somaUm)+(somaDois)+fxN));

    if (boo === true) {
      $scope.n = $scope.n/3;
    }
    for (var q = 0; q <= $scope.n; q++) {
      x.pop();
    }

    $scope.plot();
    return resultado;
  };
  $scope.Limpa = function(){
    $scope.expression = "";
    $scope.a = "";
    $scope.b = "";
    $scope.n = "";
    console.log(x[0]);
  };
  function computeYScale (width, height, xScale) {
  var xDiff = xScale[1] - xScale[0];
  var yDiff = height * xDiff / width;
  return [-yDiff / 2, yDiff / 2];
}
  $scope.plot = function(){
    //Desenha o gráfico
    try {
      var width = 600;
      var height = 300;

      // desired xDomain values
      var xScale = [-10, 10];

      functionPlot({
        width: width,
        height: height,
        xDomain: xScale,
        yDomain: computeYScale(width, height, xScale),
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
  };
  $scope.do = function(){
    if ($scope.trapezioDo || $scope.retEsq || $scope.retDir) {
      return $scope.Trapezio();
    }
    else if ($scope.simpsonOneDo) {
      return $scope.simpsonOne();
    }
    else if ($scope.simpsonThreeDo) {
      return $scope.simpsonThree();
    }
  };
});
