(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeagueCtrl', LeagueCtrl);

    LeagueCtrl.$inject = ['UserService', '$rootScope'];
    function LeagueCtrl(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.leagueUsers = null;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function getLeagueUsers(leagueId){
            UserService.GetUsersByLeague(leagueId).then(function(users){
                vm.leagueUsers = users;
            },function(error){
                alert(error);
            });
        }
        function getLeagueInfo(leagueId){
            UserService.GetLeagueInformation(leagueId).then(function(league){
                vm.league = league;
            },function(error){
                alert(error);
            });
        }
        function loadCurrentUser() {
            UserService.GetByEmail($rootScope.curUser.email)
                .then(function (user) {
                    vm.user = user;
                    getLeagueUsers(user.leagueId);
                    getLeagueInfo(user.leagueId);
                });
        }
    }

})();