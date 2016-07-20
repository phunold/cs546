/**
 * Created by troy on 7/19/16.
 */


var gsApp = angular.module('gsApp', ['ui.router','uiRouterStyles','ui.bootstrap', 'LocalStorageModule']);




gsApp.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider){

        localStorageServiceProvider.setStorageType('sessionStorage');

        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('welcome',{
                templateUrl: '/welcome/welcomeView.html',
                abstract:true
            })
            .state('welcome.main',{
                url:'/',
                templateUrl :'/welcome/mainView.html',
                controller : 'welcomeController',
                data: {
                    pageTitle: "Welcome",
                    pageDescription: "welcome"
                }

            })
            .state('welcome.login',{
                url:'/login',
                templateUrl:'/session/login/loginView.html',
                controller:'loginController',
                data: {
                    pageTitle: "Login",
                    pageDescription: "login"
                },
                params:{
                    redirectLocation: null
                }

            })
            .state('welcome.logout',{
                url:'/logout',
                templateUrl:'/session/logout/logoutView.html',
                controller:'logoutController',
                data: {
                    pageTitle: "Logout",
                    pageDescription: "logout"
                }

            })
            .state('welcome.register',{
                url:'/register',
                templateUrl:'/session/register/registerView.html',
                controller:'registerController',
                data: {
                    pageTitle: "Register",
                    pageDescription: "register"
                }
            })
            .state('welcome.registerSuccess',{
                url:'/register/{confirmation}',
                templateUrl:'/session/register/registerSuccessView.html',
                controller:'registerController',
                data: {
                    pageTitle: "Register Success",
                    pageDescription: "register, success"
                }
            })
            .state('app',{
                url:'/app',
                templateUrl :'/app/appView.html',
                //data:{
                //    css:['/resources/css/frameworks/sb-admin.css']
                //},
                abstract: true
            })
            .state('app.home',{
                url:'/home',
                templateUrl:'/app/home/homeView.html',
                controller: 'homeController',
                data: {
                    pageTitle: "Home",
                    pageDescription: "Home"
                }
            })



    }
);


gsApp.run(function ($rootScope, $state) {

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        $rootScope.pageTitle = toState.data.pageTitle;
        $rootScope.pageDescription = toState.data.pageDescription;




    });
});
