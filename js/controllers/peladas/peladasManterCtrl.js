angular.module("apppeladadosamigos").controller("peladasManterCtrl", ['$scope', 'frameAPI', 'authenticationAPI', 'notificationsAPI',
    function ($scope, frameAPI, authenticationAPI, notificationsAPI) {

        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        // setando o controle backend
        const controllerBackend = 'Peladas';

        $scope.Salvar = function (objeto) {
            
            frameAPI.insert(controllerBackend, JSON.stringify(objeto))

                .success(function (data) {

                    // enviando um push notifications
                    notificationsAPI.sendMessage($scope.tokens, 'Pelada Aberta!', 'Confirme a sua presença no app.')

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
            authenticationAPI.RotaProtegida($scope.admin,'/peladas');

            notificationsAPI.getTokens().success(function (data) {
                $scope.tokens = data;
            });
            
        };

        $scope.PreencheData = function () {

            if($scope.objeto.pda_pel_data != "")
            {
                $scope.objeto.pda_pel_mes = $scope.objeto.pda_pel_data.substr(3, 2);
                $scope.objeto.pda_pel_ano = $scope.objeto.pda_pel_data.substr(6, 4);
            }

        }

        Init();
    }]);

