/**
 * Created by troy on 7/19/16.
 */



angular.module('gsApp').controller('welcomeController', ['$scope', '$state', '$compile', '$http', '$rootScope', '$stateParams',
    function ($scope, $state, $compile, $http, $rootScope, $stateParams) {

        $rootScope.pageTitle = "Welcome";
        $rootScope.pageDescription = "welcome";



    }
]);