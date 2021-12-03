angular.module("apppeladadosamigos").factory("scoutsAPI", ['$http', 'config', function ($http, config) {

    var _getScoutsPelada = function (codigo) {
        return $http.get(config.baseUrl + "index.php/ScoutsPelada/getScoutsPelada/" + codigo);
    };

    var _gerarPresenca = function (payload) {

        return $http.post(config.baseUrl + "index.php/ScoutsPelada/gerarPresenca", payload);
    };

    var _excluirPresensa = function (codigo) {
        return $http.get(config.baseUrl + "index.php/ScoutsPelada/excluirPresenca/" + codigo);
    };

    var _excluirLancamento = function (codigo) {
        return $http.get(config.baseUrl + "index.php/ScoutsPelada/excluirLancamento/" + codigo);
    };

    var _SalvarScout = function (obj) {
        return $http.post(config.baseUrl + "index.php/ScoutsPelada/SalvarScouts", obj);
    };

    var _listaVotacaoCompleta = function (codigo) {
        return $http.get(config.baseUrl + "index.php/ScoutsPelada/listaVotacaoCompleta/" + codigo);
    };

    var _meusVotos = function (codigo_pel, codigo) {
        return $http.get(config.baseUrl + "index.php/ScoutsPelada/meusVotos/" + codigo_pel + "/" +codigo);
    };

    var _listaMelhoresAno = function (codigo) {
        return $http.get(config.baseUrl + "index.php/ScoutsPelada/listaMelhoresAno/");
    };



    return {
        getScoutsPelada: _getScoutsPelada,
        gerarPresenca: _gerarPresenca,
        excluirPresensa: _excluirPresensa,
        excluirLancamento: _excluirLancamento,
        SalvarScout : _SalvarScout,
        listaVotacaoCompleta : _listaVotacaoCompleta,
        meusVotos: _meusVotos,
        listaMelhoresAno: _listaMelhoresAno
    };

}]);