angular.module("apppeladadosamigos").factory("dashboardAPI", ['$http', 'config', function ($http, config) {

    var _getDashboard = function () {
        return $http.get(config.baseUrl + "index.php/Dashboard/getDashboard/");
    };

    var _getAuditoria = function (codigo) {
        return $http.get(config.baseUrl + "index.php/Dashboard/getAuditoria/" + codigo);
    };

    return {
        getDashboard: _getDashboard, 
        getAuditoria : _getAuditoria
    };

}]);