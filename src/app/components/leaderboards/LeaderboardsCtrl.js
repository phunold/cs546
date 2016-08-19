(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeaderboardsCtrl', LeaderboardsCtrl);

    LeaderboardsCtrl.$inject = ['$rootScope', 'UserService'];
    function LeaderboardsCtrl($rootScope, UserService) {
        var vm = this;

        vm.leaderboardUsers = null;

        initController();

        function initController() {
            getLeaderboardUsers();
        }

        function getLeaderboardUsers() {
            UserService.GetTopRecordHolders().then(function (users) {
                vm.leaderboardUsers = users;
            }, function (error) {
                alert("Error loading leaderboard: " + error);
            });
        }


    }

})();