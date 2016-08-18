(function () {
    'use strict';

    angular
        .module('app')
        .factory('SalamiService', SalamiService);

    SalamiService.$inject = ['$http', '$timeout','$q'];
    function SalamiService($http, $timeout, $q) {
        var service = {};

        //service.GetCurrentSalami = GetCurrentSalami;

        return service;

        function GetCurrentSalami() {
            return $http.get('/api/salami').then(function(success){
                return success.data;
            },function(error){
                throw error;
            });
        }

        
    }


})();