/**
 * Created by troy on 7/19/16.
 */



gsApp.directive('appNavigationBar', [
    function () {

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.getNavigationBar = function (data) {
                    if (true) {
                        return '/navigation/' + "private" + 'NavigationView.html';
                    }
                    return '/navigation/' + "public" + 'NavigationView.html';
                }
            },
            template: '<div ng-include="getNavigationBar(authenticationService)"></div>'
        };
    }]);

gsApp.directive('appFooter', [
    function () {

        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope.getFooter = function (data) {
                    return '/navigation/footerView.html';
                }
            },
            template: '<div ng-include="getFooter(authenticationService)"></div>'
        };

    }]);

