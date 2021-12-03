angular.module("apppeladadosamigos").controller("scoutsPeladaCtrl", ['$scope', 'authenticationAPI', 'scoutsAPI', 
'$routeParams', 'jogadoresAPI', 'frameAPI', 
  function ($scope, authenticationAPI, scoutsAPI, $routeParams, jogadoresAPI, frameAPI) {

    // setando informações importantes
    const controllerBackend = 'ScoutsPelada';
    $scope.admin = authenticationAPI.Decripta(authenticationAPI.getObjLogado().admin);

    var pesquisa = function () {
      scoutsAPI.getScoutsPelada($routeParams.id).then(function (response) {
        $scope.dados = response.data;
        console.log(response.data)
        carregaPeladeiros();
      });
    };

    $scope.ConfirmaPresenca = function () {
      //$("#confirmacao_presenca").modal('show');
      $("#lista_jogadores_lancamento").modal('show');
    };

    var carregaPeladeiros = function () {

      jogadoresAPI.getJogadoresPerfil().success(function (data) {
        $scope.jogadores = data;
        listaVotacaoCompleta();
      });

    };

    var listaVotacaoCompleta = function () {

      scoutsAPI.listaVotacaoCompleta($routeParams.id).success(function (data) {
        $scope.lista_completa = data;
        meusVotos();
      });

    };


    var meusVotos = function () {

      scoutsAPI.meusVotos($routeParams.id, authenticationAPI.getObjLogado().codigo).success(function (data) {
        $scope.meus_votos = data;
        jogadoresDisponiveisLancamento();
      });

    };


    var jogadoresDisponiveisLancamento = function () {
      jogadoresAPI.jogadoresDisponiveisLancamento($routeParams.id).success(function (data) {
        $scope.jogadoresDisponiveisLancamento = data;
      });
    };


    $scope.gerarPresenca = function () {

      $scope.escolhidos = $scope.jogadoresDisponiveisLancamento.filter(function(dado){
                                if (dado.selecionado) {
                                   return dado;
                                }
                            });
      var objDados = {
                "cod_pelada": $routeParams.id,
                "escolhidos": $scope.escolhidos
      };

      scoutsAPI.gerarPresenca(objDados)
        .success(function (data) {
          $("#infocadastro").show(400);
          $("#infocadastro").html("<strong>Informação</strong> Presenças Geradas.");
          $(document).ready(function () {
            setTimeout("$('#infocadastro').hide();", 2000);
          });
          pesquisa();
        })
        .error(function (data) {
          $("#infoerror").show(400);
          $("#infoerror").html(data);
        });
    }

    $scope.excluirPresensa = function (codigo) {
      scoutsAPI.excluirPresensa(codigo)
        .success(function (data) {
          pesquisa();
        })
        .error(function (data) {
          $("#infoerror").show(400);
          $("#infoerror").html(data);
        });
    }

    $scope.Salvar = function (objeto) {

      // setando o codigo da pelada
      objeto.pda_pel_cod = $routeParams.id;

      scoutsAPI.SalvarScout(JSON.stringify(objeto))

        .success(function (data) {
          $("#cadastro").modal('hide');
          $("#infocadastro").show(400);
          $("#infocadastro").html("<strong>Informação</strong> Dados salvos com sucesso.");
          $(document).ready(function () {
            setTimeout("$('#infocadastro').hide();", 2000);
          });
          pesquisa();
          Limpar();
        })
        .error(function (data) {
          $("#infoerror").show(400);
          $("#infoerror").html(data);
        });
    };

    $scope.excluirLancamento = function (codigo) {
      scoutsAPI.excluirLancamento(codigo)
        .success(function (data) {
          pesquisa();
        })
        .error(function (data) {
          $("#infoerror").show(400);
          $("#infoerror").html(data);
        });
    }

    var Limpar = function()
    {
        $scope.objeto = "";
    };

    var Init = function () {
      pesquisa();
    };

    Init();

  }]);

