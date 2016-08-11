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

        // function GetCurrentSalami() { // might need to use deferred. I'll check when testing -tk
        //     var deferred = $q.defer();

        //     $http.get('/api/salami').then(function(success){
        //         deferred.resolve(success.data);
        //     },function(error){
        //         deferred.reject(error);
        //     });

        //     return deferred.promise;

        // }
        function GetCurrentSalami() {
            return $http.get('/api/salami').then(function(success){
                return success.data;
            },function(error){
                throw error;
            });
        }

        
    }


})();