angular.module("apppeladadosamigos").factory("jogadoresAPI", ['$http', 'config', function ($http, config) {

    var _getJogadoresPerfil = function () {
        return $http.get(config.baseUrl + "index.php/Jogadores/getJogadoresPerfil/");
    };

    var _jogadoresDisponiveisLancamento = function (codigo_pelada) {

        return $http.get(config.baseUrl + "index.php/Jogadores/jogadoresDisponiveisLancamento/" + codigo_pelada);
    };


    return {
        getJogadoresPerfil: _getJogadoresPerfil,
        jogadoresDisponiveisLancamento: _jogadoresDisponiveisLancamento
    };

}]);