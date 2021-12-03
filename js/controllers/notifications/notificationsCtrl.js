angular.module("apppeladadosamigos").controller("notificationsCtrl", ['$scope', 'notificationsAPI','authenticationAPI', 
    function ($scope, notificationsAPI, authenticationAPI) {

        $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

        var carregaPeladeiros = function () {

            notificationsAPI.getPeladeirosToken().success(function (data) {

                $scope.peladeiros = data;
                
            });

        };

        $scope.enviarMensagem = function (objeto) {     


            if (!objeto.token){

                notificationsAPI.getTokens().success(function (data) {

                    $scope.tokens = data;

                    console.log(data)

                    // enviando um push notifications
                    notificationsAPI.sendMessage($scope.tokens, objeto.titulo, objeto.mensagem);
                    $("#infocadastro").show(400);
                    $("#infocadastro").html("<strong>Informação</strong> Mensagem enviada para todos.");
                    $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                    });
                    Limpar();
                });
            }
            else {
                // enviando um push notifications
                notificationsAPI.sendMessage(objeto.token, objeto.titulo, objeto.mensagem)
                 $("#infocadastro").show(400);
                $("#infocadastro").html("<strong>Informação</strong> Mensagem enviada para o peladeiro selecionado.");
                $(document).ready(function () {
                        setTimeout("$('#infocadastro').hide();", 2000);
                });
                Limpar();
            }
        };


         var Limpar = function () {
            $scope.objeto = "";
        };


        var Init = function () {

            // Protegendo a rota apenas para ADM
            authenticationAPI.RotaProtegida($scope.admin,'/home');
            carregaPeladeiros();
        };

        Init();
    }]);

