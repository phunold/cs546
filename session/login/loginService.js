/**
 * Created by troy on 7/19/16.
 */



angular.module('gsApp').service('loginService', function ($q,$http,localStorageService) {


    var loginServiceInstance = this;

    loginServiceInstance.login = function (formData) {
        var defer = $q.defer();
        var req = {  };

        $http(req).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available

            defer.resolve(response.data);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            defer.reject(response.data);
        });

        return defer.promise;
    };


    return loginServiceInstance;
});