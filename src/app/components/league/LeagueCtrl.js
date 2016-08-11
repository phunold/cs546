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

        function getLeaugeInformation(leagueId){
            UserService.GetUsersByLeague(leagueId).then(function(users){
                vm.leagueUsers = users;
            },function(error){
                alert(error);
            });

        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.curUser.username)
                .then(function (user) {
                    vm.user = user;
                    //getLeaugeInformation(user.leagueId);
                });
        }
    }

})();