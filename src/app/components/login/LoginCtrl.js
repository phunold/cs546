(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'AuthenticationService'];
    function LoginCtrl($state, AuthenticationService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.RemoveUserData();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password).then(function(success){
                AuthenticationService.StoreUserData(vm.username, vm.password);
                $state.go('app.home');
            },function(error){
                alert(error);
                vm.dataLoading = false;
            });
        };
        
        function loginResponse(response){
            if (response.success) {
               
            } else {
                
            }
        };
    }

})();
