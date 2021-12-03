angular.module("apppeladadosamigos").controller("jogadoresCtrl", ['$scope', 'frameAPI', 'authenticationAPI', 'jogadoresAPI',
    function ($scope, frameAPI, authenticationAPI, jogadoresAPI) {

        const controllerBackend = 'Jogadores';

        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        var pesquisa = function () {
            jogadoresAPI.getJogadoresPerfil().success(function (data) {
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
        
        $scope.getColor = function (st) {

            if (st > 0) {
                return "color:red;font-weight: bold;";
            }
            else {
                return "color:black;";
            }
        };

        var Init = function () {

            pesquisa();

        };

        Init();
    }]);

