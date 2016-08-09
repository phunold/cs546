(function () {
    'use strict';

    angular
        .module('app')
        .factory('SalamiService', SalamiService);

    SalamiService.$inject = ['$http', '$timeout', 'UserService','$q'];
    function SalamiService($http, $timeout, UserService, $q) {
        var service = {};

        //service.GetCurrentSalami = GetCurrentSalami;

        return service;

        function GetCurrentSalami() {
            var deferred = $q.defer();

            $http.get('/api/salami').then(function(success){
                deferred.resolve(success.data);
            },function(error){
                deferred.reject(error);
            });

            return deferred.promise;

        }
        function GetCurrentSalami2() {
            return $http.get('/api/salami').then(function(success){
                return success.data;
            },function(error){
                throw error;
            });
        }

        function PlaceSalamiWager(wager,wagerAmount){
            var wagerObj = {
                wager: wager,
                wagerAmount: wagerAmount
            }
            return $http.post('/api/salami',wagerObj).then(function(wagerId){
                alert("Success! Wager: "+ wagerId + " placed");

            },function(error){

            });
        }
    }


})();