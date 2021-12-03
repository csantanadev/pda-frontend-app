angular.module("apppeladadosamigos").controller("financeiroDetalheCtrl", ['$scope', 'frameAPI', '$routeParams', 'authenticationAPI', 'financeiroAPI', 'jogadoresAPI',
    function ($scope, frameAPI, $routeParams, authenticationAPI, financeiroAPI, jogadoresAPI) {

        // setando informacoes importantes
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
                pesquisa_Id();
            });

        };

        var pesquisa_Id = function () {

            frameAPI.getID(controllerBackend, $routeParams.id).then(function (response) {
                $scope.objeto = response.data[0];
            });

        };

        $scope.Salvar = function (objeto) {

            frameAPI.update(controllerBackend, JSON.stringify(objeto))

                .success(function (data) {
                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Dados salvos com sucesso.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });
                })
                .error(function (data) {
                    $("#infoerror").show(400);
                    $("#infoerror").html(data);
                });
        };

        var Init = function () {

            // Protegendo a rota apenas para ADM
            authenticationAPI.RotaProtegida($scope.admin,'/financeiro');
            carregaCombo();
        };

        Init();

    }]);

