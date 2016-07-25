(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
         // For any unmatched url, redirect
        $urlRouterProvider.otherwise("/");
        
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'components/home/homeView.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/loginView.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'components/register/registerView.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm'
            });
       
       
    }

    run.$inject = ['$rootScope', '$state', '$http'];
    function run($rootScope, $state,  $http) {
        // keep user logged in after page refresh
        if(!localStorage.CUR_USER){
            localStorage.CUR_USER = JSON.stringify({});
        }
        $rootScope.curUser = JSON.parse(localStorage.CUR_USER);
    
        if ($rootScope.curUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.curUser.authData; 
            //token appending to header. will need to verify when getting api calls
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = false;
            console.log("To State: ",toState.name);
            if(toState.name === "home"){
                restrictedPage = true;
            }

            //TODO: make query to a service to get restricted pages and load them 
            // var restrictedPages = [];
            // someService.getRestrictedPages().then(function(pages){
            //     restrictedPages = pages;
            // },function(error){
            //     console.log("Error fetching restricted pages: ",error);
            // });
            //var restrictedPage = $.inArray(toState, restrictedPages) === -1;

            var curUser = $rootScope.curUser;
            if(curUser){
                !Object.keys(curUser).length? curUser=false : null;
            }
            if (restrictedPage && !curUser) {
                //$location.path('/login');
                event.preventDefault();
                $state.go('login');
                return;
            }
        });
    }

})();