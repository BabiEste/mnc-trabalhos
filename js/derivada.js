var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.expression = '';  $scope.expression2= '';  $scope.x = '';  $scope.y = '';
  $scope.n = 1;
  $scope.i=[];
  $scope.m=[];
  $scope.n=[];
  $scope.i[0]=0;
  $scope.m[0]=0;
  $scope.m[1]=1;
  // $scope.m[2]=2;
  $scope.n[0]=0;
  $scope.n[1]=1;
  // $scope.n[2]=2;
  $scope.i[1]=1;
  // $scope.i[2]=2;
  $scope.variables =[];
  $scope.variables[0] ="x";
  $scope.variables[1] ="y";
  $scope.variables[2] ="z";
  $scope.z = '';
  $scope.ep = '';
  $scope.result = [];
  $scope.ep2 = '';
  $scope.grad = [];
  $scope.variablesX=[];
  $scope.hessiana = [];
  $scope.jacobiFunctions = [];
  $scope.jacobiFunctions[0] = "";
  $scope.jacobiFunctions[1] = "";
  // $scope.jacobiFunctions[2] = "x^3+y*z^2";
  $scope.jacobiVariables = [];
  $scope.jacobiMatrix = [];
  $scope.ep2 = '';

  $scope.ep3 = 0.001;
  $scope.jacobiCalculator = function (){
    console.log($scope.n.length);
    for (var j = 0; j < $scope.n.length; j++) {
      $scope.jacobiMatrix[j] =[];
      for(var s = 0; s < $scope.n.length ; s++){
        $scope.jacobiMatrix[j][s] = $scope.jacobiParcialPrimeira($scope.jacobiFunctions[j],s);
        console.log($scope.jacobiMatrix[j][s]);
      }
    }
  };
  $scope.jacobiParcialPrimeira = function(expression2,what){
    var h = 1000*$scope.ep3;
    var xi,f1,f2,p,q;
    xi = $scope.jacobiVariables[what];
    $scope.jacobiVariables[what] = xi-(-h);
    f1 = math.eval(expression2,{x: Number($scope.jacobiVariables[0]),y: Number($scope.jacobiVariables[1]),z: Number($scope.jacobiVariables[2])});
    $scope.jacobiVariables[what] = xi-h;
    f2 = math.eval(expression2,{x: Number($scope.jacobiVariables[0]),y: Number($scope.jacobiVariables[1]),z: Number($scope.jacobiVariables[2])});
    p = (f1-f2)/(2*h);
    for (var j = 0; j < 10; j++) {
      q = p;
      h = h/2;
      $scope.jacobiVariables[what] = xi-(-h);
      f1 = math.eval(expression2,{x: Number($scope.jacobiVariables[0]),y: Number($scope.jacobiVariables[1]),z: Number($scope.jacobiVariables[2])});
      $scope.jacobiVariables[what] = xi-h;
      f2 = math.eval(expression2,{x: Number($scope.jacobiVariables[0]),y: Number($scope.jacobiVariables[1]),z: Number($scope.jacobiVariables[2])});
      p = (f1-f2)/(2*h);
      if(Math.abs(p-q)<=$scope.ep3){
        $scope.jacobiVariables[what]=xi;
        return p;

      }
    }
    $scope.jacobiVariables[what]=xi;
    return p;

  };

  $scope.hessiano = function(){
    for (var j = 0; j < $scope.i.length; j++) {
      $scope.hessiana[j] =[];
      for(var s = 0; s < $scope.i.length ; s++){
        $scope.hessiana[j][s]=$scope.derivadaParcialSegunda(j,s);

      }
    }
  };
  $scope.derivadaParcialSegunda= function(veti, vetj){
    var h = $scope.ep2 * 1000;
    var xi,xj,f1,f2,f3,f4,p,q;
    xi = $scope.variablesX[veti];
    xj = $scope.variablesX[vetj];
    if(veti !== vetj){
      $scope.variablesX[veti] = xi - (-h);
      $scope.variablesX[vetj] = xj - (-h);
      f1 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      $scope.variablesX[vetj] = xj - h;
      f2 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      $scope.variablesX[veti] = xi - h;
      $scope.variablesX[vetj] = xj - h;
      f4 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      $scope.variablesX[vetj] = xj - (-h);
      f3 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      p = (f1-f2-f3-(-f4))/(4*h*h);
    }
    else{
      $scope.variablesX[veti] = xi - (-2*h);
      f1 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      $scope.variablesX[veti] = xi - 2*h;
      f3 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      $scope.variablesX[veti] = xi;
      f2 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      p = (f1 - 2*f2 -(-f3))/(4*h*h);
    }

    for (var j = 0; j < 10; j++) {
      q = p;
      h = h/2;
      if(veti !== vetj){
        $scope.variablesX[veti] = xi - (-h);
        $scope.variablesX[vetj] = xj - (-h);
        f1 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        $scope.variablesX[vetj] = xj - h;
        f2 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        $scope.variablesX[veti] = xi - h;
        $scope.variablesX[vetj] = xj - h;
        f4 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        $scope.variablesX[vetj] = xj - (-h);
        f3 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        p = (f1-f2-f3-(-f4))/(4*h*h);
      }
      else {
        $scope.variablesX[veti] = xi - (-2*h);
        f1 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        $scope.variablesX[veti] = xi - 2*h;
        f3 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        $scope.variablesX[veti] = xi;
        f2 = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
        p = (f1 - 2*f2 +f3)/(4*h*h);

      }
      if(Math.abs(p-q)<=$scope.ep2){
        $scope.variablesX[veti]=xi;
        $scope.variablesX[vetj]=xj;
        if(Math.abs(p-0)<=0.0001)
        return 0;
        return p;

      }
    }

    $scope.variablesX[veti]=xi;
    $scope.variablesX[vetj]=xj;
    if(Math.abs(p-0)<=0.0001)
    return 0;
    return p;

  };


  $scope.Gradiente = function(){
    $scope.resultadoFuncaoVaria = math.eval($scope.expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
    for (var i = 0; i < 3; i++) {
      $scope.grad[i] = $scope.derivadaParcialPrimeira($scope.expression2,i);
    }
  };
  $scope.derivadaParcialPrimeira = function(expression2,what){

    var h = 1000*$scope.ep2;
    var xi,f1,f2,p,q;
    xi = $scope.variablesX[what];
    $scope.variablesX[what] = xi-(-h);
    f1 = math.eval(expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
    // console.log(f1+"   1     "+ h);
    $scope.variablesX[what] = xi-h;
    f2 = math.eval(expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
    // console.log(f2+"   1     "+ h);
    p = (f1-f2)/(2*h);
    for (var j = 0; j < 10; j++) {
      q = p;
      h = h/2;
      $scope.variablesX[what] = xi-(-h);
      f1 = math.eval(expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      // console.log(f1+"   2       " + h);
      $scope.variablesX[what] = xi-h;
      f2 = math.eval(expression2,{x: Number($scope.variablesX[0]),y: Number($scope.variablesX[1]),z: Number($scope.variablesX[2])});
      p = (f1-f2)/(2*h);
      console.log(p+" - " + q);
      console.log(Math.abs(p-q));
      if(Math.abs(p-q)<=$scope.ep2){
        $scope.variablesX[what]=xi;
        return p;

      }
    }
    return p;

  };

  $scope.calcular = function(xFuncao) {
    $scope.x = xFuncao;
    $scope.resultadoFuncao = math.eval($scope.expression,{x: Number($scope.x)});
    try {
      $scope.h = 1000*$scope.ep;
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.ep = '';
      return "";
    }
    try {
      $scope.x1 = Number($scope.x) + Number($scope.h);
      if(isNaN($scope.ep) && isNaN($scope.x)){
        alert("Digite um número válido para o x e para o ε");
        $scope.x = '';
        $scope.ep = '';
        return "";
      }
      if(isNaN($scope.ep)){
        alert("Digite um número válido para o ε");
        $scope.ep = '';
        return "";
      }
      if(isNaN($scope.x1)){
        alert("Digite um número válido para o x");
        $scope.x = '';
        return "";
      }
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.x = '';
      return "";
    }
    try {
      $scope.x2 = Number($scope.x) - Number($scope.h);
      if(isNaN($scope.x2)){
        alert("Digite um número válido para o x");
        $scope.x = '';
        return "";
      }

    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.x = '';
      return "";
    }
    try {
      $scope.resultado1 = math.eval($scope.expression,{x: Number($scope.x1)});
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      return "";
    }
    try {
      $scope.resultado2 = math.eval($scope.expression,{x: Number($scope.x2)});
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
      return "";
    }
    try {
      $scope.p = (($scope.resultado1)-($scope.resultado2))/(2*$scope.h);
    }
    catch (err) {
      console.log(err);
      alert(err);
      $scope.expression = '';
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
    if($scope.ep > 0.1 || $scope.ep <= 0 || $scope.ep === '' || isNaN($scope.ep)){
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
    // return $scope.p;


    // DESENHA O GRÁFICO
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
    return $scope.p;
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
    return $scope.p;
  };
  $scope.verificaEp = function(){
    if($scope.ep === "" || $scope.x ==="" || $scope.expression === "")
    $scope.mostra=false;
    if(isNaN($scope.ep))
    $scope.ep = "";
  };

  // TABLE DA DERIVADA
  // $scope.addRecipientss = function() {
  //   if($scope.i.length === 0 ){
  //     $scope.i.push(0);
  //   }
  //   else {
  //     $scope.i.push($scope.i[($scope.i.length-1)]+1);
  //
  //   }
  //   console.log($scope.i[$scope.i.length-1]);
  // };
  //
  // $scope.deleteRecipientss = function() {
  //   $scope.i.pop();
  // };

  $scope.addRecipient = function(vet) {
    if(vet.length === 0 ){
      vet.push(0);
    }
    else {
      vet.push(vet[(vet.length-1)]+1);

    }
    console.log(vet[vet.length-1]);
  };

  $scope.deleteRecipient = function(vet) {
    vet.pop();
  };


  $scope.limpa = function () {
    $scope.expression = '';  $scope.expression2= '';  $scope.x = '';  $scope.y = '';
    $scope.n = 1;
    $scope.i=[];
    $scope.m=[];
    $scope.n=[];
    $scope.i[0]=0;
    $scope.m[0]=0;
    $scope.m[1]=1;
    // $scope.m[2]=2;
    $scope.n[0]=0;
    $scope.n[1]=1;
    // $scope.n[2]=2;
    $scope.i[1]=1;
    // $scope.i[2]=2;
    $scope.variables =[];
    $scope.variables[0] ="x";
    $scope.variables[1] ="y";
    $scope.variables[2] ="z";
    $scope.z = '';
    $scope.ep = '';
    $scope.result = [];
    $scope.ep2 = '';
    $scope.grad = [];
    $scope.variablesX=[];
    $scope.hessiana = [];
    $scope.jacobiFunctions = [];
    $scope.jacobiFunctions[0] = "";
    $scope.jacobiFunctions[1] = "";
    // $scope.jacobiFunctions[2] = "x^3+y*z^2";
    $scope.jacobiVariables = [];
    $scope.jacobiMatrix = [];
    $scope.ep2 = '';
  };

});
