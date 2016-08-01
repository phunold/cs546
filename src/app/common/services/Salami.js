//salami service

(function () {
    'use strict';

    angular
        .module('app')
        .factory('SalamiService', SalamiService);

    SalamiService.$inject = ['$http'];
    function SalamiService($http) {
        var service = {};

        service.GetAll = GetAll;

        return service;

        function GetAll() {
            return $http.get('/api/salami').then(handleSuccess, handleError('Error getting something'));
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
