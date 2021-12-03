angular.module("apppeladadosamigos").controller("dashboardResultadoCompCtrl", ['$scope', 'scoutsAPI', 
  function ($scope, scoutsAPI) {

    var pesquisa = function () {

      scoutsAPI.listaMelhoresAno().success(function (data) {
        $scope.melhoresAno = data;
      });

    };

    

    var Init = function () {
      pesquisa();
    };

    Init();

  }]);

