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
        vm.joinLeague = joinLeague;
        vm.createLeague = createLeague;
        vm.showLeague = false;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function joinLeague(){
            UserService.JoinLeague(vm.joinLeagueName).then(function(users){
                loadCurrentUser();
            },function(error){
                alert(error);
            });
        }

        function createLeague(){
            UserService.CreateLeague(vm.createLeagueName).then(function(users){
                loadCurrentUser();
            },function(error){
                alert(error);
            });
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
                    if(user.leagueId){

                        vm.showLeague = true;
                        getLeagueUsers(user.leagueId);
                        getLeagueInfo(user.leagueId);
                    }
                });
        }
    }

})();