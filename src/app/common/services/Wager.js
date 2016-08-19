(function () {
    'use strict';

    angular
        .module('app')
        .factory('WagerService', WagerService);

    WagerService.$inject = ['$http', '$timeout', 'UserService', '$q', '$rootScope'];
    function WagerService($http, $timeout, UserService, $q, $rootScope) {
        var service = {};

        service.PlaceSalamiWager = PlaceSalamiWager;
        service.GetLastWager = GetLastWager;

        return service;


        function PlaceSalamiWager(wager, wagerAmount) {
            var wagerObj = {
                wager: wager,
                wagerAmount: wagerAmount
            }
            return $http.post('/api/wager', wagerObj).then(function (wagerId) {
                return "Success! Wager: " + wagerId.data + " placed";

            }, function (error) {
                throw error;
            });
        }

        function GetLastWager() {
            return $http.get('/api/wager/' + $rootScope.curUser.email).then(function (success) {
                console.log(success.data);
                return success.data;
            }, function (error) {
                throw error;
            });

        }

    }


})();