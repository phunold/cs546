(function () {
    'use strict';

    angular
        .module('app')
        .factory('ScoresService', ScoresService);

    ScoresService.$inject = ['$http', '$timeout','$q'];
    function SalamScoresServiceSalamiServiceiService($http, $timeout, $q) {
        var service = {};

        service.GetCurrentScores = GetCurrentScores;

        return service;

        function GetCurrentScores() {
            return $http.get('/api/scores').then(function(success){
                return success.data;
            },function(error){
                throw error;
            });
        }

        
    }


})();
