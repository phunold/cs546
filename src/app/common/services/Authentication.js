(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$rootScope', '$timeout', 'UserService','$q'];
    function AuthenticationService($http, $rootScope, $timeout, UserService, $q) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.StoreUserData = StoreUserData;
        service.RemoveUserData = RemoveUserData;

        return service;

        function Login(email, pass) {
            
            var deferred = $q.defer();
            
            return $http.post('/authenticate', { email: email, password: pass }).then(
                function(response){
                    console.log(response);
                    return response.data;
                },function(error){
                    throw error.data.error;
                });
        }

        function Logout(){
            return $http.get('/logout').then(
                function(response){
                    console.log(response);
                    return response.data;
                },function(error){
                    throw error.data.error;
                });
        }

        function StoreUserData(email, sessionId) {
            //make a secret token

            $rootScope.curUser = {
                    email: email,
                    authdata: sessionId
                };

                // using cookie authentication instead of header.
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + sessionId; 
            localStorage.CUR_USER = JSON.stringify($rootScope.curUser);
            
        }

        function RemoveUserData() {
            $rootScope.curUser = {};
            localStorage.CUR_USER = null;
            //TODO: $http.get('/api/logout'); 
            //$http.defaults.headers.common.Authorization = 'Basic';

        }
    }


})();