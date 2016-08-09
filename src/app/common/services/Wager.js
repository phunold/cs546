(function () {
    'use strict';

    angular
        .module('app')
        .factory('WagerService', WagerService);

    WagerService.$inject = ['$http', '$timeout', 'UserService','$q'];
    function WagerService($http, $timeout, UserService, $q) {
        var service = {};

        //service.GetCurrentSalami = GetCurrentSalami;

        return service;

    
    }


})();