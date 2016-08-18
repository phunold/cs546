(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;


        function GetById(id) {
            return $http.get('/api/users/id/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {
            return $http.get('/api/users/' + email).then(handleSuccess, handleError('Error getting user by email'));
        }

        function GetTopRecordHolders(){
            //returns json obj with array of user objects. 
            //User objects will be filtered down to just have name and record (no password, balance, etc for security)
            return $http.get('/api/users/top/').then(handleSuccess, handleError('Error getting user by id'));

        }
        function GetUsersByLeague(leagueId){
            return $http.get('/api/users/league/'+ leagueId).then(handleSuccess, handleError('Error getting user by league'));

        }
        function Create(user) {
            return $http.post('/users', user).then(function(success){
                console.log(success.data.result);
            },function(error){
                throw error.data.error;
            });
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
