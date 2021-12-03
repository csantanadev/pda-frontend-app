angular.module("apppeladadosamigos").controller("peladasCtrl", ['$scope', 'frameAPI', 'authenticationAPI', 'peladasAPI', 
    function ($scope, frameAPI, authenticationAPI, peladasAPI) {

        // Setando informações iniciais
        const controllerBackend = 'Peladas';
        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);


        var carregaPeriodos = function () {

            peladasAPI.getPeriodos().success(function (data) {
                $scope.tabelas = data;
                verificaCook();
            });

        };

        var verificaCook = function () {
            cookPesq = peladasAPI.getCook(); 
            if(cookPesq)
            {
                $scope.objPesq = cookPesq;
                $scope.pesquisa();
            }
        };

        $scope.pesquisa = function () {
           
            if ($scope.objPesq != null) {
                peladasAPI.getPeladas(
                    authenticationAPI.getObjLogado().codigo,
                    $scope.objPesq.mesano.substr(0, 2),
                    $scope.objPesq.mesano.substr(2, 4)).success(function (data) {
                        $scope.dados = data;
                        peladasAPI.setCook($scope.objPesq);
                    });
            }
        };


        $scope.ConfirmaOpcao = function (cod, cod_pel) {
            $scope.codOpcao = cod;
            $scope.cod_pel = cod_pel;
            $("#confirmacao_opcao").modal('show');
        };


        $scope.ConfirmaExclusao = function (cod) {
            $scope.codexclusao = cod;
            $("#confirmacao").modal('show');
        };


        $scope.confimarPresenca = function () {

            var objDados = {
                "codigo": authenticationAPI.getObjLogado().codigo,
                "cod_pelada": $scope.cod_pel,
                "opcao": $scope.codOpcao
            };
            peladasAPI.confirmarPresenca(objDados).success(function (data) {
                $scope.pesquisa();
            });
        };


        $scope.Excluir = function (id) {


            peladasAPI.excluirPeladaCompleta(id)

                .success(function (data) {
                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Excluído com sucesso.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });

                    $("#confirmacao").modal('hide');
                    $scope.pesquisa();
                })
                .error(function (data) {
                    $("#confirmacao").modal('hide');
                    var pos = data.toUpperCase().indexOf("PARENT ROW: A FOREIGN KEY CONSTRAINT");
                    $("#infoerror").show(400);
                    if (pos > 0) {
                        $("#infoerror").html("Operação não permitida ! Registro vinculado em outra tabela.");
                        $(document).ready(function () {
                            setTimeout("$('#infoerror').hide();", 4000);
                        });
                    }
                    else {
                        $("#infoerror").html(data);
                    }
                });
        };

        $scope.getStatus = function (st) {

            if (st === "A") {
                return "label label-success";
            }
            else if (st === "V") {
                return "label label-warning";
            }
            else if (st === "F") {
                return "label label-default";
            }
            else {
                return "";
            }
        };

        $scope.getStatusDesc = function (st) {

            if (st === "A") {
                return "Pelada Aberta";
            }
            else if (st === "V") {
                return "Em Votação";
            }
            else if (st === "F") {
                return "Pelada Fechada";
            }
            else {
                return "";
            }
        };

        $scope.getOpcaoEscolhida = function (st) {

            if (st === "S") {
                return "label label-success";
            }
            else if (st === "N") {
                return "label label-danger";
            }
            else if (st === "T") {
                return "label label-primary";
            }
            else {
                return "";
            }
        };
        $scope.OpcaoEscolhidaDesc = function (st) {

            if (st === "S") {
                return "Eu vou";
            }
            else if (st === "N") {
                return "Não vou";
            }
            else if (st === "T") {
                return "Talvez";
            }
            else {
                return "";
            }
        };



        var Init = function () {

            carregaPeriodos();
        };

        Init();
    }]);

