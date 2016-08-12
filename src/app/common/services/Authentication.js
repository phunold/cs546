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

        function Login(user, pass) {
            
            var deferred = $q.defer();
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByEmail(email)
                    .then(function (user) {
                        if (user !== null && user.password === pass) {
                            deferred.resolve(true);
                        } else {
                            deferred.reject('Email or password is incorrect');
                        }
                    });
                   
            }, 1000);
            return deferred.promise;
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { email: email, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        function StoreUserData(email, password) {
            //make a secret token
            var authData = window.btoa(email + ':' + password);

            $rootScope.curUser = {
                    email: email,
                    authdata: authData
                };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authData; 
            localStorage.CUR_USER = JSON.stringify($rootScope.curUser);
            
        }

        function RemoveUserData() {
            $rootScope.curUser = {};
            localStorage.CUR_USER = null;
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }


})();