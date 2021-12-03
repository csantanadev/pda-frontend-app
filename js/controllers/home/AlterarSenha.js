angular.module("apppeladadosamigos").controller("alterarSenhaCtrl", ['$scope', 'authenticationAPI',
    function ($scope, authenticationAPI) {

        $scope.alterarSenha = function (objeto) {

            if (objeto.nova_senha != objeto.confirmar_nova_senha) {
                $("#infoerror").show(400);
                $("#infoerror").html("<strong>Erro !</strong> Nova senha e Confirmação diferentes.");
                return;
            }

            authenticationAPI.alterarSenha(authenticationAPI.getObjLogado().codigo, objeto.nova_senha, function (response) {

                if (response) {

                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Senha alterada com sucesso.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });
                } else {
                    $("#infoerror").show(400);
                    $("#infoerror").html("<strong>Erro</strong> Erro ao alterar a senha.");
                }

            });
        };


    }]);

