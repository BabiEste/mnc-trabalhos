var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.n = 1;$scope.x=[];$scope.y=[];$scope.i=[];$scope.i[0]=0;$scope.matrix = [];$scope.expression='';$scope.selecionado='';

  $scope.addRecipient = function() {

    if($scope.i.length === 0 ){
      $scope.i.push(0);
    }
    else {
      $scope.i.push($scope.i[($scope.i.length-1)]+1);

    }
    console.log($scope.i[$scope.i.length-1]);
    $scope.n++;
  };

  $scope.deleteRecipient = function() {
    if($scope.i.length > 1)
    $scope.i.pop();

    $scope.n--;
  };
  $scope.what = function(){
    try {
      console.log($scope.selecionado);
      if(document.getElementById("sct").value === "linear"){
        console.log("sucesso");
        return completaMatrix();
      }
    } catch (e) {
      alert("Algo está errado");
    }

  };
  var completaMatrix = function(){
    try {


      for (var i = 0; i < $scope.i.length; i++) {
        $scope.matrix[i]=[];
        for (var j = 0; j < $scope.i.length; j++) {
          if(j === 0)
          $scope.matrix[i][j] = 1;
          else {
            $scope.matrix[i][j] = $scope.x[i]*$scope.matrix[i][j-1];
          }
        }
      }
      console.log($scope.matrix[0]);
      console.log($scope.matrix[1]);
      console.log($scope.matrix[2]);
      $scope.triangulo($scope.matrix);
      console.log($scope.x);
      var fun='';
      for (var k = 0; k < $scope.i.length; k++) {
        if(k===0)
        fun+=$scope.x[k].toString();
        else {
          fun+=$scope.x[k].toString()+"*"+"x^"+k.toString();
        }
        if(k!== $scope.i.length-1)
        fun+="+";
      }
      if(isNaN(fun))
      alert("Digitou letra onde não devia, né?");
      console.log(fun);

      return fun;
    } catch (e) {
      alert("Tem algo errado!");
    }
  };

  $scope.triangulo = function () {
    var m;
    for (var j  = 0; j < $scope.i.length-1; j++) {
      for (var i = j+1; i < $scope.i.length; i++) {
        try {
          m = $scope.matrix[i][j]/$scope.matrix[j][j];
        } catch (e) {
          alert("Error");
        }

        for (var k = j; k < $scope.i.length; k++) {
          $scope.matrix[i][k] = $scope.matrix[i][k] - m*$scope.matrix[j][k];

        }
        $scope.y[i] = $scope.y[i] - m*$scope.y[j];
      }
    }
    $scope.x = tSolution();
  };

  var tSolution = function(){
    var x = [],soma =0;
    x[$scope.i.length - 1] = $scope.y[$scope.i.length - 1]/$scope.matrix[$scope.i.length - 1][ $scope.i.length - 1];
    for (var i = $scope.i.length - 1; i >=0 ; i--) {
      soma = 0;
      for (var j = i+1; j <   $scope.i.length; j++) {
        soma += $scope.matrix[i][j]*x[j];
      }
      x[i] = round(($scope.y[i]-soma)/$scope.matrix[i][i]);
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
});
