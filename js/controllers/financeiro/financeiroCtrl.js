angular.module("apppeladadosamigos").controller("financeiroCtrl", ['$scope', 'frameAPI', 'authenticationAPI', 'peladasAPI', 'financeiroAPI','notificationsAPI',
    function ($scope, frameAPI, authenticationAPI, peladasAPI, financeiroAPI, notificationsAPI) {

        const controllerBackend = 'Financeiro';

        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        var carregaTabelas = function () {

            financeiroAPI.getTabelas().success(function (data) {
                $scope.tabelas = data;

                // Pegando os tokens
                notificationsAPI.getTokens().success(function (data) {
                    $scope.tokens = data;
                    verificaCook();
                });

            });
        };

        var verificaCook = function () {
            cookPesq = financeiroAPI.getCook(); 
            if(cookPesq)
            {
                $scope.objPesq = cookPesq;
                $scope.pesquisa();
            }
        };

        $scope.pesquisa = function () {

            if ($scope.objPesq.mesano != null) {

                $scope.tipo = $scope.objPesq.tipo;    
                if (($scope.objPesq.tipo == null) || ($scope.objPesq.tipo == ""))
                {
                    $scope.tipo = "T";
                }
                financeiroAPI.getLancamentos(
                    $scope.objPesq.mesano.substr(0, 2),
                    $scope.objPesq.mesano.substr(2, 4), $scope.tipo).success(function (data) {
                        $scope.dados = data;
                        financeiroAPI.setCook($scope.objPesq);
                    });
            }
            else
            {
                $scope.dados = null;
            }
        };

        $scope.gerarMensalidades = function () {

            if ($scope.objPesq) {

                financeiroAPI.gerarMensalidades($scope.objPesq.mesano)

                    .success(function (data) {

                        // enviando um push notifications
                        notificationsAPI.sendMessage($scope.tokens, 'Sua mensalidade foi lançada no app!', 'Fique atento a data do pagamento.')

                        $("#infocadastro").show(400);
                        $("#infocadastro").html("<strong>Informação</strong> Mensalidades Geradas.");
                        $(document).ready(function () {
                            setTimeout("$('#infocadastro').hide();", 2000);
                        });
                        $scope.pesquisa();
                    })
                    .error(function (data) {
                        $("#infoerror").show(400);
                        $("#infoerror").html(data);
                    });

            }
        }

        $scope.gerarTaxaExtra = function () {

            if ($scope.objPesq) {
                financeiroAPI.gerarTaxaExtra($scope.objPesq.mesano)

                    .success(function (data) {
                        $("#infocadastro").show(400);
                        $("#infocadastro").html("<strong>Informação</strong> Taxas Geradas.");
                        $(document).ready(function () {
                            setTimeout("$('#infocadastro').hide();", 2000);
                        });
                        $scope.pesquisa();
                    })
                    .error(function (data) {
                        $("#infoerror").show(400);
                        $("#infoerror").html(data);
                    });
            }
        }

        $scope.ConfirmaExclusao = function (cod) {
            $scope.codexclusao = cod;
            $("#confirmacao").modal('show');
        };

        $scope.ConfirmaRecebimento = function (cod, dadoBaixa) {
            $scope.lan_cod = cod;
            $scope.dadoBaixa = dadoBaixa;            
            $("#confirmacao_recebimento").modal('show');
        };

        $scope.ConfirmaMensalidades = function () {
            if ($scope.objPesq) {
                $("#confirmacao_mensalidades").modal('show');
            }
        };
        $scope.ConfirmaTaxas = function () {
            if ($scope.objPesq) {
                $("#confirmacao_taxas").modal('show');
            }
        };


        $scope.Excluir = function (id) {

            frameAPI.delete(controllerBackend, id)

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


        $scope.Receber = function (codigo) {

            financeiroAPI.confirmarRecebimento(codigo)

                .success(function (data) {

                    if($scope.dadoBaixa.pda_jog_push_token){
                        // enviando um push notifications
                        notificationsAPI.sendMessage($scope.dadoBaixa.pda_jog_push_token, 'Recebimento!', 'Recebemos a importância de '+
                            'R$'+$scope.dadoBaixa.pda_lan_valor+' reais referente à '+$scope.dadoBaixa.pda_tlc_descricao+'.')
                    }

                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Pagamento Confirmado.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });
                    $scope.pesquisa();
                })
                .error(function (data) {
                    $("#infoerror").show(400);
                    $("#infoerror").html(data);
                });
        };

        $scope.getStatus = function (st) {

            if (st === "P") {
                return "label label-success";
            }
            else if (st === "D") {
                return "label label-danger";
            }
            else {
                return "";
            }
        };

        $scope.getStatusDesc = function (st) {

            if (st === "P") {
                return "Receita";
            }
            else if (st === "D") {
                return "Despesa";
            }
            else {
                return "";
            }
        };

        $scope.getStatusSituacao = function (st) {

            if (st == 'ABERTO') {
                return "color:#d9534f;";
            }
            else if (st == 'PAGO') {
                return "color:#5cb85c;";
            }
            else {
                return "color:black;";
            }
        };

        var Init = function () {

            carregaTabelas();
        };

        Init();
    }]);

