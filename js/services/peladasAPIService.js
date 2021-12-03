angular.module("apppeladadosamigos").factory("peladasAPI", ['$http', 'config', '$cookieStore', 
  function ($http, config, $cookieStore) {

    var _getPeriodos = function (codigo) {
        return $http.get(config.baseUrl + "index.php/Peladas/getPeriodo/");
    };

    var _getPeladas = function (codigo, mes, ano) {

        return $http.get(config.baseUrl + "index.php/Peladas/getPeladas/" + codigo + "/" + mes + "/" + ano);
    };

    var _podeVotar = function (codigo_pelada, codigo_jogador) {

        return $http.get(config.baseUrl + "index.php/Peladas/podeVotar/"+codigo_pelada+"/"+codigo_jogador);
    };

    var _confirmarPresenca = function (objDados) {

        return $http.post(config.baseUrl + "index.php/Peladas/confirmarPresenca/", objDados);
    };


    var _getJogadoresVotacao = function (objDados) {

        return $http.post(config.baseUrl + "index.php/Peladas/getJogadoresVotacao/", objDados);
    };

    var _enviarVotacao = function (objDados) {

        return $http.post(config.baseUrl + "index.php/Peladas/enviarVotacao/", objDados);
    };

    var _setCook = function (obj) {
        $cookieStore.put('cookPesqPelada', obj);
    };

    var _getCook = function () {

        return $cookieStore.get('cookPesqPelada');

    };

    var _excluirPeladaCompleta = function (codigo) {

        return $http.post(config.baseUrl + "index.php/Peladas/ExcluirPeladaCompleta/", codigo);
    };

    var _fecharPelada = function (codigo) {

        return $http.post(config.baseUrl + "index.php/Peladas/FecharPelada/", codigo);
    };


    var _getQtdJogadores = function () {

        return $http.get(config.baseUrl + "index.php/Peladas/getQtdJogadores/");
    };


    return {
        getPeriodos: _getPeriodos,
        getPeladas: _getPeladas,
        confirmarPresenca: _confirmarPresenca,
        setCook : _setCook,
        getCook : _getCook,
        excluirPeladaCompleta: _excluirPeladaCompleta,
        getJogadoresVotacao: _getJogadoresVotacao,
        enviarVotacao : _enviarVotacao,
        podeVotar : _podeVotar,
        fecharPelada : _fecharPelada,
        getParamQtdJogadores: _getQtdJogadores
    };

}]);