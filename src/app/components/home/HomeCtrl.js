(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['UserService', 'SalamiService' , '$rootScope'];
    function HomeCtrl(UserService, SalamiService , $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.currentSalami = null;

        vm.deleteUser = deleteUser;
        vm.placeSalamiWager = placeSalamiWager;
        
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            //getCurrentSalami();
        }

        function getCurrentSalami(){
            SalamiService.GetCurrentSalami().then(function(currentSalami){
                vm.currentSalami = currentSalami;
            }, function(error){
                alert("System Error, Couldn't load current Salami!");;
            });

        }

        function placeSalamiWager(wager, wagerAmount){
            
            SalamiService.PlaceSalamiWager(wager, wagerAmount).then(function(receipt){
                alert("Successfully Placed Wager");
            },function(error){
                alert("Error placing wager" + error);
            });
        }

        //test functions for user management 
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.curUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }


    }

})();