angular.module("apppeladadosamigos").factory("homeAPI", ['$http', 'config', function ($http, config) {

    var _getPerfil = function (codigo) {
        return $http.get(config.baseUrl + "index.php/Jogadores/getPerfil/"+codigo);
    };

    return {
        getPerfil: _getPerfil
    };

}]);