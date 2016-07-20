/**
 * Created by troy on 7/19/16.
 */


angular.module('gsApp').controller('registerController', ['$scope', '$state', '$compile', 'registerService', '$rootScope', '$stateParams',
    function ($scope, $state, $compile, registerService, $rootScope, $stateParams) {

        if($stateParams.confirmation == "true"){
            $rootScope.pageTitle = "Register";
            $rootScope.pageDescription = "register confirmation";
        }else{
            $rootScope.pageTitle = "Register";
            $rootScope.pageDescription = "register";


            $scope.accountRegisterCheck = {};
            $scope.accountRegisterCheck.isValid = false;

            $scope.formData = {
                email : "",
                password: "",
                confirmPassword: "",
                agreement: false
            };

            $scope.registerActionEvent = function (){
                //$scope.accountRegisterCheck.msg = "Information is invalid. Try again.";
                if($scope.formData.agreement == false){
                    alert("Please agree to the notice to continue.");
                    return;
                }
                registerService.requestAccess($scope.formData)
                    .then(function(response){
                        $scope.accountRegisterCheck.isValid = true;

                        $state.go('welcome.registerSuccess',{confirmation:true});

                    }, function(error){
                        $scope.accountRegisterCheck.isValid = false;
                        $scope.accountRegisterCheck.msg = "Information is invalid. Try again.";
                        alert(error);
                    });

            };
        }


    }
]);