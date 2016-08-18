(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['UserService', '$state', '$rootScope'];
    function RegisterCtrl(UserService, $state, $rootScope) {
        var vm = this;

        vm.register = register;
        vm.user = {
            email: "abc@email.com",
            passwd: "password",
            fname: "Bird",
            lname: "Hate THis Class"

        }

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    alert("Congratulations! Now please sign in");
                    $state.go('login');
                    
                },function(error){
                    alert(error);
                    vm.dataLoading = false;
                });
        }
    }

})();
