(function () {
    'use strict';

    angular
        .module('app')
        .factory('WagerService', WagerService);

    WagerService.$inject = ['$http', '$timeout', 'UserService', '$q'];
    function WagerService($http, $timeout,UserService, $q) {
        var service = {};

        service.PlaceSalamiWager = PlaceSalamiWager;
        service.GetLastWager = GetLastWager;

        return service;


        function PlaceSalamiWager(wager,wagerAmount){
            var wagerObj = {
                wager: wager,
                wagerAmount: wagerAmount
            }
            return $http.post('/api/wager',wagerObj).then(function(wagerId){
                return "Success! Wager: "+ wagerId + " placed";

            },function(error){
                throw error;
            });
        }

        function GetLastWager(){
            UserService.GetByUsername($rootScope.curUser.username).then(function(user){
                return $http.get('/api/wager/'+user.username);
            }).then(function(wager){
                //if we want to modify the wager info before it goes back to controller do it here
                return wager;
            },function(error){
                throw error;
            })
        }
    
    }


})();