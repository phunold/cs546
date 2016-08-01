(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeaderboardsCtrl', LeaderboardsCtrl);

    LeaderboardsCtrl.$inject = ['$rootScope'];
    function LeaderboardsCtrl($rootScope) {
        var vm = this;

        initController();

        function initController() {
            console.log("Loaded LeaderboardsCtrl")
        }

       
    }

})();