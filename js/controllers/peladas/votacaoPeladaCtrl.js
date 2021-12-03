angular.module("apppeladadosamigos").controller("votacaoPeladaCtrl", ['$scope', '$routeParams', 'authenticationAPI', 'peladasAPI', '$location',
    function ($scope, $routeParams, authenticationAPI, peladasAPI, $location) {

        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        var pesquisa = function () {

            var objDados = {
                "codigo": authenticationAPI.getObjLogado().codigo,
                "cod_pelada": $routeParams.id
            };

            peladasAPI.getJogadoresVotacao(objDados).success(function (data) {
                $scope.dados = data;
                getParamQtdJogadores();
            });
        };


        var getParamQtdJogadores = function () {

            peladasAPI.getParamQtdJogadores().success(function (data) {
                $scope.param = data;
            });

        };



        $scope.EnviarVotacao = function () {

             var objDados = {
                "codigo": authenticationAPI.getObjLogado().codigo,
                "cod_pelada": $routeParams.id,
                "escolhidos": $scope.escolhidos
            };

            peladasAPI.enviarVotacao(objDados)
                .success(function (data) {
                    $("#sucesso_votacao").modal('show');
                })
                .error(function (data) {
                    $("#infoerror").show(400);
                    $("#infoerror").html(data);
                });
        };  


        $scope.redirecionar = function () {            
            $location.path('/peladas');
        };


        $scope.verificaQtdSelecionados = function(dados) {

            peladasAPI.podeVotar($routeParams.id, authenticationAPI.getObjLogado().codigo)
            .success(function (data) {

               
                if(data.pda_pel_status == 'F')
                {
                   $("#votacao_encerrada").modal('show'); 
                }
                else if(data.ja_votou == 'S')
                {
                   $("#ja_votou").modal('show'); 
                }
                else
                {
                   $scope.escolhidos = dados.filter(function(dado){

                        if (dado.selecionado) {
                           return dado;
                        }

                    });

                    if (parseInt($scope.escolhidos.length) <=  parseInt($scope.param.valor) )
                    {
                        $("#confirmacao_opcao").modal('show');
                    }
                    else
                    {
                        $("#erro_votacao").modal('show');
                    }
                }
            })
            .error(function (data) {
                $("#infoerror").show(400);
                $("#infoerror").html(data);
            });
            
        }

        var Init = function () {

            pesquisa();

        };

        Init();
    }]);

