(function () {
    'use strict';

    angular
        .module('app')
        .controller('LeagueCtrl', LeagueCtrl);

    LeagueCtrl.$inject = ['UserService', '$rootScope'];
    function LeagueCtrl(UserService, $rootScope) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
            loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.curUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }
    }

})();