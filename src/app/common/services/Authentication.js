(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$rootScope', '$timeout', 'UserService','$q'];
    function AuthenticationService($http, $rootScope, $timeout, UserService, $q) {
        var service = {};

        service.Login = Login;
        service.StoreUserData = StoreUserData;
        service.RemoveUserData = RemoveUserData;

        return service;

        function Login(email, pass) {
            
            var deferred = $q.defer();
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------
            $timeout(function () {
                var response;
                UserService.GetByEmail(email)
                    .then(function (user) {
                        if (user !== null && user.password === pass) {
                            deferred.resolve("sessionid-tok");
                        } else {
                            deferred.reject('Email or password is incorrect');
                        }
                    });
                   
            }, 1000);
            return deferred.promise;

            */
            //Use this for real authentication
             //----------------------------------------------
            return $http.post('/authenticate', { email: email, password: pass }).then(
                function(response){
                    console.log(response);
                    return response.data.session.id; //TODO: figure out what returns;
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