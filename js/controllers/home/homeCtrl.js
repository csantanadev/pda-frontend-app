angular.module("apppeladadosamigos").controller("homeCtrl", ['$scope', 'authenticationAPI', 'homeAPI', '$location', '$routeParams',
  function ($scope, authenticationAPI, homeAPI, $location, $routeParams) {

    var ACodigo;
    // se for a home principal pega o codigo logado, senao pega o via parametro
    if ($location.path() === '/') {
      ACodigo = authenticationAPI.getObjLogado().codigo
      $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);
    }
    else {
      ACodigo = $routeParams.id;
    }

    var pesquisa = function () {

      homeAPI.getPerfil(ACodigo).success(function (data) {
        $scope.dados = data;
      });

    };


    $scope.getStatus = function (st) {

      if (st === "A") {
        return "label label-success";
      }
      else if (st === "M") {
        return "label label-danger";
      }
      else if (st === "U") {
        return "label label-warning";
      }
      else if (st === "I") {
        return "label label-default";
      }
      else {
        return "";
      }
    };

    $scope.getColor = function (st) {

      if (st > 0) {
        return "color:red;font-weight: bold;";
      }
      else {
        return "color:black;";
      }
    };

    $scope.getStatusPag = function (st) {

      if (st === "PAGO") {
        return "success";
      }
      else if (st === "ABERTO") {
        return "danger";
      }
      else {
        return "";
      }
    };

    $scope.getStatusDesc = function (st) {

      if (st === "A") {
        return "Ativo";
      }
      else if (st === "U") {
        return "Ausente";
      }
      else if (st === "I") {
        return "Inativo";
      }
      else if (st === "M") {
        return "DM";
      }
      else {
        return "";
      }
    };

    $scope.getSituacao = function (st) {

      if (st === "M") {
        return "Mensalista";
      }
      else if (st === "D") {
        return "Diarista";
      }
    };

    var Init = function () {

      $("#menuOpcoes").show();
      pesquisa();
    };

    Init();

  }]);

