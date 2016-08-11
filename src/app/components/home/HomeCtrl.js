(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['UserService', 'SalamiService' , '$interval', '$rootScope']; //TODO: inject WagerService
    function HomeCtrl(UserService, SalamiService , $interval, $rootScope) {
        var vm = this;

        //variable initialization
        vm.user = null;
        vm.allUsers = [];
        vm.currentSalami = null;
        vm.newWager = {
            wager: "",
            wagerAmount: 0
        }

        vm.deleteUser = deleteUser;
        vm.placeSalamiWager = placeSalamiWager;
        //vm.addWagerInfoToUser = addWagerInfoToUser; //don't add to vm unless needed to be called in view
        
        initController();
        //set interval to update the salami
        //var salamiUpdateInterval = $interval(getCurrentSalami(),10000);
        
        function initController() {
            loadCurrentUser();
            //getCurrentSalami();
            
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
                if(wager.timestamp === today){ //TODO: determine date info from wager
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
            WagerService.PlaceSalamiWager(wager, wagerAmount).then(function(receipt){
                alert(receipt);
            },function(error){
                alert("Error placing wager: " + error);
            });
        }

        //test functions for user management 
        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.curUser.username)
                .then(function (user) {
                    vm.user = user;
                    //TODO: addWagerInfoToUser();
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