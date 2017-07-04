'use strict';
	
    var app = angular.module('app', ['ngRoute', 'ngCookies', 'pascalprecht.translate']);
    app.config(function($routeProvider, $locationProvider, $translateProvider){
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'private_page.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'registration.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
		
		$translateProvider.fallbackLanguage('en');
		$translateProvider.registerAvailableLanguageKeys(['en', 'ru'],{
			'en_*':'en',
			'ru_*':'ru'
		})
		
        $translateProvider.useStaticFilesLoader({
			prefix: '/translations/',
			suffix: '.json'
		});
		
		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage('en');
    });

    app.controller('Ctrl',['$scope', '$translate', function ($scope, $translate) {
      $scope.changeLanguage = function(key){
        $translate.use(key);
      };
    }]);

    app.run(function ($rootScope, $location, $cookies, $http){
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        };

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    });