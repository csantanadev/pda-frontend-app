angular.module("apppeladadosamigos").factory("financeiroAPI", ['$http', 'config', '$cookieStore', 
  function ($http, config, $cookieStore) {

    var _getLancamentos = function (mes, ano, tipo) {

        return $http.get(config.baseUrl + "index.php/Financeiro/getLancamentos/" + mes + "/" + ano + "/" + tipo);
    };

    var _getTiposLancamentos = function () {

        return $http.get(config.baseUrl + "index.php/Financeiro/getTiposLancamentos/");
    };

    var _confirmarRecebimento = function (codigo) {

        return $http.get(config.baseUrl + "index.php/Financeiro/confirmarRecebimento/" + codigo);
    };

    var _gerarMensalidades = function (mesano) {

        return $http.get(config.baseUrl + "index.php/Financeiro/gerarMensalidades/" + mesano);
        
    };

    var _gerarTaxaExtra = function (mesano) {

        return $http.get(config.baseUrl + "index.php/Financeiro/gerarTaxaExtra/" + mesano);
        
    };

    var _getTabelas = function (codigo) {
        return $http.get(config.baseUrl + "index.php/Financeiro/getPeriodo/");
    };

    var _setCook = function (obj) {
        $cookieStore.put('cookPesqFinanc', obj);
    };

    var _getCook = function () {

        return $cookieStore.get('cookPesqFinanc');

    };

    return {
        getLancamentos: _getLancamentos,
        getTiposLancamentos: _getTiposLancamentos,
        confirmarRecebimento: _confirmarRecebimento,
        gerarMensalidades: _gerarMensalidades,
        gerarTaxaExtra: _gerarTaxaExtra,
        getTabelas: _getTabelas,
        setCook : _setCook,
        getCook : _getCook
    };

}]);