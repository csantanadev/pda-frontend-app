angular.module("apppeladadosamigos").factory("frameAPI", ['$http', 'config', function ($http, config) {

        var _get = function (controller) {
            return $http.get(config.baseUrl + "index.php/"+controller+"/get/");
        };

        var _getPaginado = function (controller, qtd, inicio) {
            return $http.get(config.baseUrl + "index.php/"+controller+"/get_paginado/"+qtd+'/'+inicio);
        };

        var _getCount = function (controller)
        {
            return $http.get(config.baseUrl + "index.php/"+controller+"/getCount");
        }

        var _getID = function (controller, id) {
            return $http.get(config.baseUrl + "index.php/"+controller+"/get_by_id/" + id);
        };

        var _insert = function (controller, obj)
        {
            return $http.post(config.baseUrl + "index.php/"+controller+"/insert", obj);
        };

        var _update = function (controller, obj)
        {
            return $http.post(config.baseUrl + "index.php/"+controller+"/update", obj);
        };

        var _delete = function (controller, id)
        {
            return $http.get(config.baseUrl + "index.php/"+controller+"/delete/" + id);
        };

        return {
            get: _get,
            getPaginado: _getPaginado,            
            getCount: _getCount,            
            getID: _getID,            
            insert: _insert,
            update : _update,
            delete : _delete
        };

    }]);