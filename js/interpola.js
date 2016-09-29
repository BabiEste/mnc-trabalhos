var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.n = 1;$scope.x=[];$scope.y=[];$scope.i=[];$scope.i[0]=0;$scope.matrix = [];$scope.expression='';$scope.selecionado='';
  var deltay = [];
  var xAux=[],yAux=[];
  var newton = function () {
    deltay[0]=[];
    var itera = $scope.x.length;
    for (var i = 0; i < $scope.x.length; i++) {
      deltay[0][i] = $scope.y[i];
    }
    console.log(deltay[0]);
    for (var j = 1; j <$scope.x.length; j++) {
      deltay[j]=[];
      for (var k = 0; k < itera; k++) {
        deltay[j][k]=(deltay[j-1][k+1]-deltay[j-1][k])/($scope.x[k+j]-$scope.x[k]);
      }
      itera--;
    console.log(deltay[j]);
    }
    return monta1();
  };

  var monta1 = function () {
    var fun='';
    for (var i = 0; i < $scope.x.length; i++) {
      if(i===0)
      fun+=deltay[i][0]+"+(x-"+$scope.x[i]+")*";
      else if(i!==($scope.x.length-1)){
      fun+="("+deltay[i][0]+"+(x-"+$scope.x[i]+")";

      }
      else {
        fun+="("+deltay[i][0];
      }
      if(i!==($scope.x.length -1) && i!== 0)
      fun+="*";
      if(i===$scope.x.length-1) {
        for (var j = 0; j < $scope.x.length-1; j++) {
          fun+=")";
        }
      }
    }
    console.log(fun);
    return fun;
    };

  var newtongreg = function () {
    deltay[0]=[];
    var itera = $scope.x.length;
    for (var i = 0; i < $scope.x.length; i++) {
      deltay[0][i] = $scope.y[i];
    }
    console.log(deltay[0]);
    for (var j = 1; j <$scope.x.length; j++) {
      deltay[j]=[];
      for (var k = 0; k < itera; k++) {
        deltay[j][k]=(deltay[j-1][k+1]-deltay[j-1][k]);
      }
        console.log(deltay[j]);
      itera--;
    }
    return monta2();
  };
  var fat = function (x) {
    if(x===0 || x===0)
      return 1;
    return x*fat(x-1);
  };
  var monta2 = function () {
    var fun='';
    var deltaAux;
    var aux;
    var h = Math.abs($scope.x[0]-$scope.x[1]);
    for (var i = 0; i < $scope.x.length; i++) {
      aux = fat(i);
      // deltaAux ="("+$scope.deltay[i][0]+")/"+"("+aux+"!*"+h+"^"+aux+")";
      try {


      if(i===0)
      fun+=deltay[i][0]+"+(x-"+$scope.x[i]+")*";
      else if(i!==($scope.x.length -1)){
      fun+="("+"("+deltay[i][0]+")/"+"("+aux+"*"+h+"^"+i+")"+"+(x-"+$scope.x[i]+")";

      }
      else {
        fun+="("+"("+deltay[i][0]+")/"+"("+aux+"*"+h+"^"+i+")";
      }
      if(i!==($scope.x.length -1) && i!== 0)
      fun+="*";
    } catch (e) {
      alert("Algo deu errado");
      return "";
    }
      if(i===$scope.x.length-1) {
        for (var j = 0; j < $scope.x.length-1; j++) {
          fun+=")";
        }
      }
    }
    // console.log(fun);
    return fun;
    };

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
      console.log($scope.selecionado);
      if(document.getElementById("sct").value === "linear"){
        console.log("sucesso");
        return completaMatrix();
      }
      else if(document.getElementById("sct").value === "newton"){
        console.log("sucesso");
        return newton();
      }
      else if(document.getElementById("sct").value === "gregory"){
        console.log("sucesso");
        return newtongreg();
      }


  };

  //MÉTODO POR SISTEMA LINEAR
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
        if(isNaN($scope.matrix) || isNaN($scope.x[i])){
        alert("Algo está muito errado");
        $scope.limpa();
        return;
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
        $scope.y[k]=yAux[k];
        if(k===0)
        fun+=xAux[k].toString();
        else {
          fun+=xAux[k].toString()+"*"+"x^"+k.toString();
        }
        if(k!== $scope.i.length-1)
        fun+="+";
      }

      return fun;
    } catch (e) {
      alert("Tem algo errado!");
      return;
    }
  };

  $scope.triangulo = function () {
    var m;

    for (var j  = 0; j < $scope.i.length-1; j++) {
      yAux[j] = $scope.y[j];
      if (j === ($scope.i.length-2)) {
      yAux[j+1]=$scope.y[j+1];
      }
      for (var i = j+1; i < $scope.i.length; i++) {
        try {
          m = $scope.matrix[i][j]/$scope.matrix[j][j];
        } catch (e) {
          alert("Error");
          return;
        }

        for (var k = j; k < $scope.i.length; k++) {
          $scope.matrix[i][k] = $scope.matrix[i][k] - m*$scope.matrix[j][k];

        }
        $scope.y[i] = $scope.y[i] - m*$scope.y[j];
      }
    }
    xAux = tSolution();
  };

  var tSolution = function(){
    var x = [],soma =0;
    x[$scope.i.length - 1] = $scope.y[$scope.i.length - 1]/$scope.matrix[$scope.i.length - 1][ $scope.i.length - 1];
    for (var i = $scope.i.length - 1; i >=0 ; i--) {
      soma = 0;
      for (var j = i+1; j <   $scope.i.length; j++) {
        soma += $scope.matrix[i][j]*x[j];
      }
      try {
      x[i] = round(($scope.y[i]-soma)/$scope.matrix[i][i]);

      } catch (e) {
      alert("Divisão por zero");
      return;
      }
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
  $scope.limpa = function () {
    $scope.x=[];$scope.y=[];$scope.i=[];$scope.i[0]=0;$scope.matrix = [];$scope.expression='';$scope.selecionado='';
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
