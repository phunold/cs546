(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
         // For any unmatched url, redirect
        $urlRouterProvider.otherwise("/app/home");
        
        $stateProvider
            
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/loginView.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: "Login"
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'components/register/registerView.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: "Register"
                }
            })
            .state('app',{
                url:'/app',
                templateUrl :'common/views/appView.html',
                abstract: true
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'components/home/homeView.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: "Home"
                }
            })
            .state('app.league', {
                url: '/league',
                templateUrl: 'components/league/leagueView.html',
                controller: 'LeagueCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: "League"
                }
            })
            .state('app.leaderboards', {
                url: '/leaderboards',
                templateUrl: 'components/leaderboards/leaderboardsView.html',
                controller: 'LeaderboardsCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: "Leaderboards"
                }
            })
            .state('app.scores', {
                url: '/scores',
                templateUrl: 'components/scores/scoresView.html',
                controller: 'ScoresCtrl',
                controllerAs: 'vm',
                data: {
                    pageTitle: "MLB Scores"
                }
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

        //init for page tile on change
        $rootScope.pageTitle = "";

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = false;
            console.log("To State: ",toState.name);

            //set the page title
            if(toState.data && toState.data.pageTitle){
                $rootScope.pageTitle = toState.data.pageTitle;
            }

            if(toState.name === "app.home"){
                restrictedPage = true;
            }
            else if(toState.name === "app.league"){
                restrictedPage = true;
            }

            //TODO: make query to a service to get restricted states and load them 
            // maybe because of the time crunch we just hardcode an array of states here like the home
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