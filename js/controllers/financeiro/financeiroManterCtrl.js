angular.module("apppeladadosamigos").controller("financeiroManterCtrl", ['$scope', 'frameAPI', 'authenticationAPI', 'jogadoresAPI',
    'financeiroAPI',
    function ($scope, frameAPI, authenticationAPI, jogadoresAPI, financeiroAPI) {

        // setando informações importantes
        const controllerBackend = 'Financeiro';
        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        var carregaCombo = function () {

            financeiroAPI.getTiposLancamentos().success(function (data) {
                $scope.tipos = data;
                carregaPeladeiros();
            });

        };

        var carregaPeladeiros = function () {

            jogadoresAPI.getJogadoresPerfil().success(function (data) {
                $scope.jogadores = data;
            });

        };

        $scope.Salvar = function (objeto) {

            frameAPI.insert(controllerBackend, JSON.stringify(objeto))

                .success(function (data) {
                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Dados salvos com sucesso.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });
                    Limpar();
                })
                .error(function (data) {
                    $("#infoerror").show(400);
                    $("#infoerror").html(data);
                });
        };

        var Limpar = function () {
            $scope.objeto = "";
        };

        var Init = function () {

            // Protegendo a rota apenas para ADM
            authenticationAPI.RotaProtegida($scope.admin,'/financeiro');

            carregaCombo();
        };

        Init();
    }]);

