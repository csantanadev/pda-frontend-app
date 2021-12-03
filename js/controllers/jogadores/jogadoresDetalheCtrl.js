angular.module("apppeladadosamigos").controller("jogadoresDetalheCtrl", ['$scope', 'frameAPI', '$routeParams','authenticationAPI','$location',
    function ($scope, frameAPI, $routeParams, authenticationAPI, $location) {

        const controllerBackend = 'Jogadores';
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
                if ($scope.objeto.pda_jog_senha){
                    $scope.objeto.pda_jog_senha = authenticationAPI.Decripta($scope.objeto.pda_jog_senha);
                }
            });

        };

        $scope.Salvar = function (objeto) {

            objeto.pda_jog_senha = authenticationAPI.Encripta(objeto.pda_jog_senha);
            frameAPI.update(controllerBackend, JSON.stringify(objeto))

                .success(function (data) {
                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Dados salvos com sucesso.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });
                    //$location.path('/jogadores');
                })
                .error(function (data) {
                    $("#infoerror").show(400);
                    $("#infoerror").html(data);
                });
        };

        var Init = function () {
            // Protegendo a rota apenas para ADM
            authenticationAPI.RotaProtegida($scope.admin,'/jogadores');
            getTabelas();
        };

        Init();
        

    }]);

