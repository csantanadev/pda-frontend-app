angular.module("apppeladadosamigos").controller("jogadoresManterCtrl", ['$scope', 'frameAPI', 'dadosTabela','authenticationAPI', 
    function ($scope, frameAPI, dadosTabela, authenticationAPI) {

        // Recebendo dados Via Resolve
        $scope.tabelas = dadosTabela.data;
        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        // setando o controle backend
        const controllerBackend = 'Jogadores';

        $scope.Salvar = function (objeto) {

            objeto.pda_jog_senha = authenticationAPI.Encripta(objeto.pda_jog_senha);
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
            authenticationAPI.RotaProtegida($scope.admin,'/jogadores');
        };

        Init();

    }]);

