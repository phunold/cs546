(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['UserService', 'SalamiService' , '$rootScope']; //TODO: inject WagerService
    function HomeCtrl(UserService, SalamiService , $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.currentSalami = null;
        vm.newWager = {
            wager: "",
            wagerAmount: 0
        }

        vm.deleteUser = deleteUser;
        vm.placeSalamiWager = placeSalamiWager;
        vm.getUsersLastWager = getUsersLastWager;
        
        initController();

        function initController() {
            loadCurrentUser();
            //getCurrentSalami();
            //getUsersLastWager();
        }

        function getCurrentSalami(){
            SalamiService.GetCurrentSalami().then(function(currentSalami){
                vm.currentSalami = currentSalami;
            }, function(error){
                alert("System Error, Couldn't load current Salami!");;
            });

        }

        function addWagerInfoToUser(){
            WagerService.GetLastWager().then(function(wager){
                var today  = new Date().toString();
                if(wager.timestamp === today){
                    vm.user.hasCurrentDayWager = true;
                }else{
                    vm.user.hasCurrentDayWager = false;
                }
                vm.user.currentWager = wager.wager;
                vm.user.currentWagerAmount = wager.wagerAmount;

            },function(error){
                alert("System Error, Couldn't load user's last wager!");;
            });
        }

        function placeSalamiWager(){
            var wager = vm.newWager.wager;
            var wagerAmount = vm.newWager.wagerAmount;
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