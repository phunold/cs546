(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScoresCtrl', ScoresCtrl);

    ScoresCtrl.$inject = ['$rootScope','ScoresService'];
    function ScoresCtrl($rootScope,ScoresService) {
        var vm = this;

        initController();

        function initController() {
            getLatestScores();
        }

        function getLatestScores(){
             ScoresService.GetCurrentScores().then(function(scores){
                vm.currentGames = scores;
            },function(error){
                alert(error);
            });
        }
        
    }

})();