var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.expression = '';
  $scope.x = '';
  $scope.ep = '';
  $scope.calcular = function(xFuncao) {
    $scope.x = xFuncao;
    // $scope.resultado = math.eval($scope.expression,{x: Number($scope.x)});
    try {
      $scope.h = 1000*$scope.ep;
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.x1 = Number($scope.x) + Number($scope.h);
      if(isNaN($scope.x1)){
        alert("Digite um número válido para o x");
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.x2 = Number($scope.x) - Number($scope.h);
      if(isNaN($scope.x2)){
        alert("Digite um número válido para o x");
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }

    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.resultado1 = math.eval($scope.expression,{x: Number($scope.x1)});
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.resultado2 = math.eval($scope.expression,{x: Number($scope.x2)});
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.p = (($scope.resultado1)-($scope.resultado2))/(2*$scope.h);
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.q = $scope.p;
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    try {
      $scope.h = ($scope.h) / 2;
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      $scope.x = '';
      $scope.ep = '';
      return "";
    }
    if($scope.ep > 0.1 || $scope.ep <= 0 || $scope.ep === ''){
      $scope.ep = '';
      $scope.mostra = false;
      alert("Digite um número válido para o ε");
      return "";
    }
    // derivada primeira
    do{

      $scope.x1 = Number($scope.x) + Number($scope.h);
      $scope.x2 = Number($scope.x) - Number($scope.h);
      $scope.q = $scope.p;
      try {
        $scope.resultado1 = math.eval($scope.expression,{x: Number($scope.x1)});
      }
      catch (err) {
        console.log(err);
        alert(err);
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
      try {
        $scope.resultado2 = math.eval($scope.expression,{x: Number($scope.x2)});
      }
      catch (err) {
        console.log(err);
        alert(err);
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
      try {
        $scope.p = (($scope.resultado1)-($scope.resultado2))/(2*$scope.h);
      }
      catch (err) {
        console.log(err);
        alert(err);
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
      try {
        $scope.h = $scope.h / 2;
      }
      catch (err) {
        console.log(err);
        alert(err);
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
      try {
        $scope.resultadoFalso = $scope.p - $scope.q;
      }
      catch (err) {
        console.log(err);
        alert(err);
        $scope.expression = '';
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
    }while(Math.abs($scope.resultadoFalso) > $scope.ep);
    // $scope.resultado = $scope.p;
    return $scope.p;
    // do{
    //
    //
    // }while(Math.abs($scope.resultadoFalso) > $scope.ep);
    // $scope.resultadoOrdemDois = $scope.p;
    // try {
    //   functionPlot({
    //     target: '#plot',
    //     data: [{
    //       fn: $scope.expression,
    //       sampler: 'builtIn',  // this will make function-plot use the evaluator of math.js
    //       graphType: 'polyline'
    //     }]
    //   });
    // }
    // catch (err) {
    //   console.log(err);
    //   alert(err);
    // }
  };

  $scope.segunda = function(xFuncao){
    $scope.h = 1000*$scope.ep;
    $scope.x1 = Number($scope.x) + 2*Number($scope.h);
    $scope.x2 = Number($scope.x) - 2*Number($scope.h);
    $scope.resultado1 = math.eval($scope.expression,{x: Number($scope.x1)});
    $scope.resultado2 = math.eval($scope.expression,{x: Number($scope.x2)});
    $scope.resultado3 = 2*math.eval($scope.expression,{x: Number($scope.x)});
    $scope.p = (($scope.resultado1)-($scope.resultado3) + ($scope.resultado2))/(4*$scope.h*$scope.h);
    $scope.q = $scope.p;
    // $scope.Auxiliar1 = $scope.calcular(xFuncao + Number($scope.h));
    // $scope.Auxiliar2 = $scope.calcular(xFuncao - Number($scope.h));
    // $scope.ResultadoDerivadaSegunda = (Number($scope.h) - Number($scope.h))/ (2*h);
    $scope.h = ($scope.h) / 2;
    if($scope.ep > 0.1 || $scope.ep <= 0){
      $scope.ep = '';
      return "";
    }
    do{

      $scope.x1 = Number($scope.x) + 2*Number($scope.h);
      $scope.x2 = Number($scope.x) - 2*Number($scope.h);
      $scope.q = $scope.p;
      try {
        $scope.resultado1 = math.eval($scope.expression,{x: Number($scope.x1)});
      }
      catch (err) {
        console.log(err);
        alert(err);
      }
      try {
        $scope.resultado2 = math.eval($scope.expression,{x: Number($scope.x2)});
      }
      catch (err) {
        console.log(err);
        alert(err);
      }
      try {
        $scope.resultado3 = 2*math.eval($scope.expression,{x: Number($scope.x)});
      }
      catch (err) {
        console.log(err);
        alert(err);
      }
      try {
        $scope.p = (($scope.resultado1)-($scope.resultado3) + ($scope.resultado2))/(4*$scope.h*$scope.h);
      }
      catch (err) {
        console.log(err);
        alert(err);
      }
      try {
        $scope.h = $scope.h / 2;
      }
      catch (err) {
        console.log(err);
        alert(err);
      }
      try {
        $scope.resultadoFalso = $scope.p - $scope.q;
      }
      catch (err) {
        console.log(err);
        alert(err);
      }
    }while(Math.abs($scope.resultadoFalso) > $scope.ep);
    // $scope.resultado = $scope.p;
    return $scope.p;



  };
  $scope.verificaEp = function(){
    if($scope.ep === "")
    $scope.mostra=false;
  };
});
