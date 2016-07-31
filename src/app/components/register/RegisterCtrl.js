(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['UserService', '$state', '$rootScope'];
    function RegisterCtrl(UserService, $state, $rootScope) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        $state.go('login');
                    } else {
                        alert(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
