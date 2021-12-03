angular.module("apppeladadosamigos").controller("peladasDetalheCtrl", ['$scope', 'frameAPI', '$routeParams','authenticationAPI','notificationsAPI', 'peladasAPI', 
    function ($scope, frameAPI, $routeParams, authenticationAPI, notificationsAPI, peladasAPI) {

        const controllerBackend = 'Peladas';
        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        var getTabelas = function () {

            frameAPI.get('Tabela').then(function (response) {

                $scope.tabelas = response.data;
                pesquisa_Id();
            });
        };

        var pesquisa_Id = function () {

            frameAPI.getID(controllerBackend, $routeParams.id).then(function (response) {
                $scope.objeto = response.data[0];

                // Pegando os tokens
                notificationsAPI.getTokens().success(function (data) {
                    $scope.tokens = data;
                });

            });

        };

        $scope.Salvar = function (objeto) {

            frameAPI.update(controllerBackend, JSON.stringify(objeto))

                .success(function (data) {

                    if(objeto.pda_pel_status == 'V') 
                    {
                        // enviando um push notifications
                        notificationsAPI.sendMessage($scope.tokens, 'Votação Aberta!', 'Faça a sua parte e vote nos melhores do dia.')
                    }
                    else if(objeto.pda_pel_status == 'F') 
                    {

                        peladasAPI.fecharPelada(objeto.pda_pel_cod)

                            .success(function (data) {

                                // enviando um push notifications
                                notificationsAPI.sendMessage($scope.tokens, 'Votação Encerrada!', 'Da uma olhada lá nos mais votados da última pelada.')
                            }
                        );

                    }    
                    
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

        $scope.PreencheData = function () {

            if($scope.objeto.pda_pel_data != "")
            {
                $scope.objeto.pda_pel_mes = $scope.objeto.pda_pel_data.substr(3, 2);
                $scope.objeto.pda_pel_ano = $scope.objeto.pda_pel_data.substr(6, 4);
            }

        }

        var Init = function () {
            // Protegendo a rota apenas para ADM
            authenticationAPI.RotaProtegida($scope.admin,'/peladas');
            getTabelas();
        };

        Init();

    }]);

