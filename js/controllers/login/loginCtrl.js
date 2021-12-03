angular.module("apppeladadosamigos").controller("loginCtrl", ['$scope', '$location', 'authenticationAPI', '$rootScope',
    function ($scope, $location, authenticationAPI, $rootScope) {

        authenticationAPI.ClearCredentials();

        // verificação se esconde menu
        $scope.escondeMenu = !$rootScope.globals.currentUser;

        if ($scope.escondeMenu) {
            $("#menuOpcoes").hide();
        }

        $scope.login = function () {

            authenticationAPI.Login($scope.username, $scope.password, function (response) {

                if (response.success == "true") {

                    authenticationAPI.SetCredentials($scope.username, $scope.password,
                        response.pda_jog_apelido, response.pda_jog_admin, response.pda_jog_cod);
                    $location.path('/');

                } else  if (response.success == "inativo") {

                    $scope.error = "Você foi inativado pelo administrador.";
                    $("#aviso_erro").modal('show');
                }
                else
                {
                    $scope.error = "Usuário ou Senha Inválida.";
                    $("#aviso_erro").modal('show');
                }

            });
        };


    }]);

