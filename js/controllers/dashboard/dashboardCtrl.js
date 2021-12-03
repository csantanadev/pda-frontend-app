angular.module("apppeladadosamigos").controller("dashboardCtrl", ['$scope', 'authenticationAPI', 'dashboardAPI','scoutsAPI', 
  function ($scope, authenticationAPI, dashboardAPI, scoutsAPI) {

    var pesquisa = function () {

      dashboardAPI.getDashboard().success(function (data) {
        $scope.dados = data;
        melhoresAno();
      });

    };

    var melhoresAno = function () {

      scoutsAPI.listaMelhoresAno().success(function (data) {
        $scope.melhoresAno = data;
      });

    };

    $scope.getColor = function (st) {

      if (st > 0) {
        return "color:red;font-weight: bold;";
      }
      else {
        return "color:black;";
      }
    };

    $scope.getZebrado = function (mesa) {

      if ( (mesa == 'JAN') || (mesa == 'MAR') || (mesa == 'MAI') || (mesa == 'JUL')|| (mesa == 'SET')|| (mesa == 'NOV') ) {
        return "background-color: #DDE3E0";
      }
      else
      {
        return "background-color: #FFFFFF";
      }
    };

    var Init = function () {
      pesquisa();
    };

    Init();

  }]);

