var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.i=[];$scope.x=[];$scope.x[0]='';$scope.i[0]=0;$scope.expression=[]; $scope.j=[];$scope.j[0]=0;$scope.expression[0]="";$scope.ep='';
  $scope.jacobiMatrix=[]; $scope.fx=[]; $scope.xAux = [];$scope.expression[1]=''; $scope.x[1]='';$scope.i[1]=1;
  var round = function(number){
    number = number * 10000;
    if((number - Math.round(number)) <= 0.0001){
      return Math.round(number)/10000;
    }

    else return number/10000;
  };
  var arruma = function () {
    for (var i = 0; i < $scope.x.length; i++) {
      $scope.x[i]= round($scope.x[i]);
    }
  };
  $scope.hCalculator = function () {

    if(isNaN($scope.ep)){
      alert("Digitou letra onde não devia, né?");
      return;
    }
    if(document.getElementById("sct").value === "modifi"){
      console.log("MODIFICADO");
      $scope.jacobiCalculator();
      console.log($scope.jacobiMatrix[0]);
      console.log($scope.jacobiMatrix[1]);
    }
    try {
      for(j=0; j<100;j++){
        if(document.getElementById("sct").value === "newton"){
          console.log("NEWTON NORMAL");
          $scope.jacobiCalculator();
        }
        if(document.getElementById("sct").value === "modifi" && j%5 ===0){
        $scope.jacobiCalculator();
        }
        for (var i = 0; i < $scope.i.length; i++) {
          $scope.fx[i] = (-1)*math.eval($scope.expression[i],{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});


        }
        $scope.triangulo();
        console.log($scope.h + "    " + $scope.fx);
        for (var s = 0; s < $scope.x.length; s++) {
          $scope.x[s] = ($scope.x[s]-(-$scope.h[s]));
          if (isNaN($scope.x[s]) || !isFinite($scope.x[s])) {
            alert("Deu algo errado!");
            $scope.limpa();
            return;
          }
        }
        for(var k=0;k<$scope.h.length-1;k++){
          if(Math.abs($scope.h[k]) < $scope.ep && Math.abs($scope.h[k+1]) < $scope.ep){
            arruma();
            return true;
          }
        }
      }
    } catch (e) {
      alert("Algo de errado não está certo!");
    }
  };
  $scope.jacobiCalculator = function (){
    for (var j = 0; j < $scope.i.length; j++) {
      $scope.jacobiMatrix[j] =[];
      for(var s = 0; s < $scope.i.length ; s++){
        $scope.jacobiMatrix[j][s] = $scope.jacobiParcialPrimeira($scope.expression[j],s);
      }
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
    try {
      p = (f1-f2)/(2*h);
    } catch (e) {
      alert("Tem algo errado!");
    }

    for (var j = 0; j < 10; j++) {
      q = p;
      try {
        h = h/2;
      } catch (e) {
        $scope.limpa();
        alert("Tem algo errado!");
        return;
      }
      $scope.x[what] = xi-(-h);
      f1 = math.eval(expression,{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});
      $scope.x[what] = xi-h;
      f2 = math.eval(expression,{x: Number($scope.x[0]),y: Number($scope.x[1]),z: Number($scope.x[2])});
      try {
        p = (f1-f2)/(2*h);
      } catch (e) {
      $scope.limpa();
      alert("Deu algo errado!");
      return;
      }
      if(Math.abs(p-q)<=$scope.ep){
        $scope.x[what]=xi;
        return p;

      }
    }
    $scope.x[what]=xi;
    return p;

  };


  // SISTEMA RESOLVIDO POR GAUSS SIMPLES PARA ACHAR O h


  $scope.triangulo = function () {
    var m;
    var fx = [];
    for (var j  = 0; j < $scope.i.length-1; j++) {
      for (var i = j+1; i < $scope.i.length; i++) {
        try {
          m = $scope.jacobiMatrix[i][j]/$scope.jacobiMatrix[j][j];
        } catch (e) {
          $scope.limpa();
          alert("Error");
          return;
        }

        for (var k = j; k < $scope.i.length; k++) {
          $scope.jacobiMatrix[i][k] = $scope.jacobiMatrix[i][k] - m*$scope.jacobiMatrix[j][k];

        }
        $scope.fx[i] = $scope.fx[i] - m*$scope.fx[j];
      }
    }
    $scope.h = tSolution();
  };

  var tSolution = function(){
    var x = [],soma =0;

    x[$scope.i.length - 1] = $scope.fx[$scope.i.length - 1]/$scope.jacobiMatrix[$scope.i.length - 1][ $scope.i.length - 1];

    if(!isFinite(x[$scope.i.length - 1] ) || isNaN(x[$scope.i.length - 1] )){
      alert("Divisão por zero ou algo deu muito errado");
      $scope.limpa();
      return;
    }

    for (var i = $scope.i.length - 1; i >=0 ; i--) {
      soma = 0;
      for (var j = i+1; j <   $scope.i.length; j++) {
        soma += $scope.jacobiMatrix[i][j]*x[j];
      }
      try {
      x[i] = round(($scope.fx[i]-soma)/$scope.jacobiMatrix[i][i]);

      } catch (e) {
      alert("Divisão por zero");
      $scope.limpa();
      return;
      }
    }
    return x;
  };


  $scope.limpa = function () {
    $scope.i=[];$scope.x=[];$scope.x[0]='';$scope.i[0]=0;$scope.expression=[]; $scope.j=[];$scope.j[0]=0;$scope.expression[0]="";$scope.ep='';
    $scope.jacobiMatrix=[]; $scope.fx=[]; $scope.xAux = [];$scope.expression[1]=''; $scope.x[1]='';$scope.i[1]=1;
  };

  $scope.addRecipient = function() {
    if($scope.i.length === 0 ){
      $scope.i.push(0);
      $scope.j.push(0);
    }
    else if($scope.i.length <5){
      $scope.i.push($scope.i[($scope.i.length-1)]+1);

    }
  };

  $scope.deleteRecipient = function() {
    if($scope.i.length>2)
    $scope.i.pop();

  };
});
