var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.expression = 'sin(x)';
  $scope.expression3 = 'x - cos(x)';
  $scope.expression2 = '(((x+6)*20/12)^(1/2))/10 * sin((x+6)*20/12)';
  $scope.a = -10;
  $scope.ep = 0.01;
  $scope.b = 10;
  $scope.delta = 0.1;
  $scope.intervaloImparp=[];
  $scope.intervaloImparq=[];
  $scope.solucao = [];
  $teste = '';

  $scope.buscaUniforme = function(){
    var p,q, deltaBusca;
    deltaBusca = $scope.delta;
    if($scope.intervaloImparq.length !== 0){
    delete $scope.intervaloImparq[0];
    delete $scope.intervaloImparp[0];
    $scope.intervaloImparq=[];
    $scope.intervaloImparp= [];
    console.log($scope.intervaloImparp.length);
}
    if(isNaN($scope.a) || isNaN($scope.b) || isNaN($scope.delta))
    alert("Algo de errado não está certo, digitou letras onde não devia? Malandrinho, em!");
    p = $scope.a;
    q = p - ( - Number(deltaBusca));
    try {
      if(math.eval($scope.expression,{x: Number(q)}) === 0){
        console.log("skansain");
        if ((math.eval($scope.expression,{x: Number(p)}) * math.eval($scope.expression,{x: Number(q+0.001)})) < 0 ){

          $scope.intervaloImparp.push(p);
          $scope.intervaloImparq.push(q);
        }
      }
      if(math.eval($scope.expression,{x: Number(p)}) === 0){
        if ((math.eval($scope.expression,{x: Number(p-0.001)}) * math.eval($scope.expression,{x: Number(q)})) < 0 ){

          $scope.intervaloImparp.push(p);
          $scope.intervaloImparq.push(q);
        }
      }
      else if ((math.eval($scope.expression,{x: Number(p)}) * math.eval($scope.expression,{x: Number(q)})) < 0 ){

        $scope.intervaloImparp.push(p);
        $scope.intervaloImparq.push(q);
      }
      p=q;
      while (q <= $scope.b) {
        q = p + deltaBusca;
        if(math.eval($scope.expression,{x: Number(q)}) === 0){
          console.log("skansain");
          if ((math.eval($scope.expression,{x: Number(p)}) * math.eval($scope.expression,{x: Number(q+0.001)})) < 0 ){

            $scope.intervaloImparp.push(p);
            $scope.intervaloImparq.push(q);
          }
        }
        if(math.eval($scope.expression,{x: Number(p)}) === 0){
          if ((math.eval($scope.expression,{x: Number(p+0.001)}) * math.eval($scope.expression,{x: Number(q)})) < 0 ){

            $scope.intervaloImparp.push(p);
            $scope.intervaloImparq.push(q);
          }
        }
        else if ((math.eval($scope.expression,{x: Number(p)}) * math.eval($scope.expression,{x: Number(q)})) < 0 ){
          p=round(p);
          q=round(q);
          $scope.intervaloImparp.push(p);
          $scope.intervaloImparq.push(q);
        }
        p=q;
      }


    } catch (e) {
      alert("Algo de errado não está certo, reveja o que fez");
    }
  };

  $scope.newtonCalculator =function(){
    for (var i = 0; i < $scope.intervaloImparq.length; i++) {
      $scope.solucao[i]=$scope.newton($scope.intervaloImparp[i],$scope.intervaloImparq[i]);
    }
  };

  $scope.newton = function(aAux,bAux){
    var p,q,derivate;
    p = aAux;
    for (var i = 0; i < 100; i++) {
      q=p;
      derivate = calcular(p);
      console.log(p);
      if(derivate === 0)
      derivate = calcular(p-(-$scope.ep));
      p = p -(math.eval($scope.expression,{x: Number(p)}))/derivate;
      if(Math.abs(p-q)<$scope.ep)
      return p;
    }

    return p;
  };
  $scope.newtonModCalculator =function(){
    for (var i = 0; i < $scope.intervaloImparq.length; i++) {
      $scope.solucao[i]=$scope.newtonMod($scope.intervaloImparp[i],$scope.intervaloImparq[i]);
    }
  };

  $scope.newtonMod = function(aAux,bAux){
    var p,q,derivate,cont=0;
    p = aAux;
    derivate = calcular(p);
    for (var i = 0; i < 100; i++) {
      q=p;
      if(cont%5 ===0)
      derivate = calcular(p);
      console.log(p);
      if(derivate === 0)
      derivate = calcular(p-(-$scope.ep));
      p = p -(math.eval($scope.expression,{x: Number(p)}))/derivate;
      cont++;
      if(Math.abs(p-q)<$scope.ep)
      return p;
    }

    return p;
  };
  var map = function(a,fb,b,fa){
    return ((a*fb)-(b*fa))/(fb-fa);
  };
  var map2 = function(a,fb,b,fa){
    return ((a*fb/2)-(b*fa))/(fb/2-fa);
  };

  $scope.cordasCalculator = function(){
    for (var i = 0; i < $scope.intervaloImparq.length; i++) {
      $scope.solucao[i]=$scope.cordas($scope.intervaloImparp[i],$scope.intervaloImparq[i]);
    }
  };
  $scope.cordasModCalculator = function(){
    for (var i = 0; i < $scope.intervaloImparq.length; i++) {
      $scope.solucao[i]=$scope.cordasModificado($scope.intervaloImparp[i],$scope.intervaloImparq[i]);
    }
  };

  $scope.cordas = function(aAux, bAux){
    var p;
    try {

      p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
      if ((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) <= 0 || (math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) < 0.00001){
        bAux = p;
        p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
      }
      else {
        aAux = p;
        p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
      }
      if((p-0) <= 0.0001 || (bAux - aAux) <= $scope.ep)
      return map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));

      for(var i = 0; i<100; i++) {
        if((p-0) <= 0.00001 || Math.abs(bAux - aAux) <= $scope.ep || bAux === aAux){
          return map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
        if ((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) <= 0 || (math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) < 0.00001){
          bAux = p;
          p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
        else {
          aAux = p;
          p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
        if(i=== 99)
        return p;
      }
    } catch (e) {
      alert("Algo errado não está certo!");
    }
  };
  $scope.cordasModificado = function(aAux, bAux){
    var p;
    try {

      p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
      if ((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) <= 0 || (math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) < 0.00001){
        bAux = p;
        p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
      }
      else {
        aAux = p;
        p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
      }
      if((p-0) <= 0.0001 || (bAux - aAux) <= $scope.ep)
      return map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));

      for(var i = 0; i<100; i++) {

        if ((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) <= 0 || (math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) < 0.00001){
          bAux = p;
          p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
        else if((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) > 0){
          p=map2(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
        else {
          aAux = p;
          p=map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
        if(i=== 99)
        return p;
        if((p-0) <= 0.00001 || Math.abs(bAux - aAux) <= $scope.ep || bAux === aAux){
          return map(aAux,math.eval($scope.expression,{x: Number(bAux)}),bAux,math.eval($scope.expression,{x: Number(aAux)}));
        }
      }
    } catch (e) {
      alert("Algo errado não está certo!");
    }
  };

  var media = function(a,b){
    return (a + b)/2;
  };

  $scope.divisaoMeioCalculator = function(){
    for (var i = 0; i < $scope.intervaloImparq.length; i++) {
      $scope.solucao[i]=$scope.divisaoMeio($scope.intervaloImparp[i],$scope.intervaloImparq[i]);
    }
  };
  $scope.divisaoMeio = function(aAux,bAux){
    var p;
    p = media(aAux,bAux);
    if ((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) <= 0 || (math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) < 0.00001){
      bAux = p;
      p = media(aAux,bAux);
    }
    else {
      aAux = p;
      p = media(aAux,bAux);
    }
    while (true) {
      if ((math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) <= 0 || (math.eval($scope.expression,{x: Number(aAux)}) * math.eval($scope.expression,{x: Number(p)})) < 0.00001){
        bAux = p;
        p = media(aAux,bAux);
      }
      else {
        aAux = p;
        p = media(aAux,bAux);
      }
      if((p-0) <= 0.0000000001 || (bAux - aAux) <= $scope.ep){
        return media(aAux,bAux);
      }
    }
  };
  var round = function(number){
    number = number * 100000;
    if((number - Math.round(number)) <= 0.00001){
      return Math.round(number)/100000;
    }

    else return number/100000;
  };


  var calcular = function(xFuncao) {
    var x = xFuncao;
    var resultadoFuncao, x1,x2,q,p,resultado1,resultado2,resultadoFalso,h;
    h = 1000*$scope.ep;
    h = h / 2;
    resultadoFuncao = math.eval($scope.expression,{x: Number(x)});
    x1 = Number(x) - (-Number(h));
    x2 = Number(x) - Number(h);
    q = p;
    try {
      resultado1 = math.eval($scope.expression,{x: Number(x1)});
    }
    catch (err) {
    }
    try {
      resultado2 = math.eval($scope.expression,{x: Number(x2)});
    }
    catch (err) {
    }
    try {
      p = ((resultado1)-(resultado2))/(2*h);
    }
    catch (err) {
    }
    try {
      h = h / 2;
    }
    catch (err) {
    }
    try {
      resultadoFalso = p - q;
    }
    catch (err) {
    }
    // derivada primeira
    do{

      x1 = Number(x) - (-Number(h));
      x2 = Number(x) - Number(h);
      q = p;
      try {
        resultado1 = math.eval($scope.expression,{x: Number(x1)});
      }
      catch (err) {
      }
      try {
        resultado2 = math.eval($scope.expression,{x: Number(x2)});
      }
      catch (err) {
      }
      try {
        p = ((resultado1)-(resultado2))/(2*h);
      }
      catch (err) {
      }
      try {
        h = h / 2;
      }
      catch (err) {
      }
      try {
        resultadoFalso = p - q;
      }
      catch (err) {
      }
    }while(Math.abs(resultadoFalso) > $scope.ep);
    return p;
  };
  function computeYScale (width, height, xScale) {
  var xDiff = xScale[1] - xScale[0];
  var yDiff = height * xDiff / width;
  return [-yDiff / 2, yDiff / 2];
}
  $scope.plot = function(){
    //Desenha o gráfico
    console.log("yoo");
    try {
      var width = 600;
      var height = 300;

      // desired xDomain values
      var xScale = [$scope.a, $scope.b];

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
