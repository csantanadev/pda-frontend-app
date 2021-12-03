angular.module("apppeladadosamigos").controller("dashboardAuditoriaCtrl", ['$scope', 'dashboardAPI', 'jogadoresAPI',
  function ($scope, dashboardAPI, jogadoresAPI) {


    $scope.pesquisa = function () {
       
        if ($scope.pda_jog_cod != null) {


           dashboardAPI.getAuditoria($scope.pda_jog_cod).success(function (data) {
                $scope.auditoria = data;
          });

        }
        else
        {
          $scope.auditoria = null;
        }
    };

    $scope.getZebrado = function (pi) {

      if (pi == 'par') {
        return "background-color: #DDE3E0";
      }
      else
      {
        return "background-color: #FFFFFF";
      }
    };

    var carregaPeladeiros = function () {

            jogadoresAPI.getJogadoresPerfil().success(function (data) {
                $scope.jogadores = data;
            });

    };
    

    var Init = function () {
      carregaPeladeiros();
    };

    Init();

  }]);

