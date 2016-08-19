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
        service.GetUsersByLeague = GetUsersByLeague;
        service.GetLeagueInformation = GetLeagueInformation;
        service.GetTopRecordHolders = GetTopRecordHolders;
        service.JoinLeague = JoinLeague;
        service.CreateLeague = CreateLeague;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;


        function GetById(id) {
            return $http.get('/api/users/id/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {
            email = encodeURI(email);
            return $http.get('/api/users/' + email).then(function (response) {
                return response.data;
            }, function (error) {
                throw error.data.error;
            });
        }

        function GetTopRecordHolders() {
            //returns json obj with array of user objects. 
            return $http.get('/api/users/top/leaderboard/').then(function (success) {
                return success.data;
            }, function (error) {
                throw error;
            });

        }
        function GetUsersByLeague(leagueId) {
            return $http.get('/api/users/league/' + leagueId).then(function (success) {
                console.log(success.data);
                return success.data;
            }, function (error) {
                throw error;
            });
        }
        function GetLeagueInformation(leagueId) {
            return $http.get('/api/users/league/info/' + leagueId).then(function (success) {
                console.log(success.data);
                return success.data;
            }, function (error) {
                throw error;
            });
        }

        function JoinLeague(leagueId) {

            return $http.put('/api/users/league/join/', { leagueId: leagueId }).then(function (success) {
                console.log(success.data);
                return success.data;
            }, function (error) {
                throw error;
            });
        }
        function CreateLeague(newName) {
            var leagueInfo = {
                name: newName
            }
            return $http.post('/api/users/league/create/', leagueInfo).then(function (success) {
                console.log(success.data);
                return success.data;
            }, function (error) {
                throw error;
            });
        }

        function Create(user) {
            return $http.post('/users', user).then(function (success) {
                console.log(success.data.result);
            }, function (error) {
                throw error.data.error;
            });
        }


        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }


    }

})();
