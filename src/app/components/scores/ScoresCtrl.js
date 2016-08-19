(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScoresCtrl', ScoresCtrl);

    ScoresCtrl.$inject = ['ScoresService', '$rootScope'];
    function ScoresCtrl(ScoresService, $rootScope) {
        var vm = this;

        initController();

        function initController() {
            getLatestScores();
        }

        function getLatestScores() {
            ScoresService.GetCurrentScores().then(function (scores) {
                console.log(scores);
                vm.currentGames = scores;
            }, function (error) {
                alert(error);
            });
        }

    }

})();
