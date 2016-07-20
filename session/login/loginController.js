/**
 * Created by troy on 7/19/16.
 */

angular.module('gsApp').controller('loginController', ['$scope', '$state', '$compile','$http','loginService', '$rootScope', '$stateParams',
    function ($scope, $state, $compile, $http, loginService, $rootScope, $stateParams) {


        $scope.accountLoginCheck = {};
        $scope.accountLoginCheck.isValid = false;

        $scope.formData = {
            email : "",
            password : "",
            remember : false
        };

        $scope.loginActionEvent = function (){


            //$scope.accountLoginCheck.msg = "Login information is invalid. Try again.";
            loginService.login($scope.formData)
                .then(function(user){
                    $scope.accountLoginCheck.isValid = true;

                    $state.go('app.home');

                }, function(error){

                    $scope.accountLoginCheck.isValid = false;
                    $scope.accountLoginCheck.msg = error.data;
                });

        };



    }
]);