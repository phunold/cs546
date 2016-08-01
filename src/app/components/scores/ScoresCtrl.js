(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScoresCtrl', ScoresCtrl);

    ScoresCtrl.$inject = ['$rootScope'];
    function ScoresCtrl($rootScope) {
        var vm = this;

        vm.user = null;

        initController();

        function initController() {
        }

        
    }

})();