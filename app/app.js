(function() {
	'use strict';

	angular.module('tripOrganiser', [
		'ngRoute',
		'tripOrganiser.notification',
		'tripOrganiser.users.userIdentity',
		'tripOrganiser.users.login',
		'tripOrganiser.users.register',
		'tripOrganiser.home'
	])

		.config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
			$locationProvider.hashPrefix('!');
			$routeProvider.otherwise({redirectTo: '/home'});

			$httpProvider.interceptors.push(['$q', '$injector', function($q, $injector) {
				return {
					'responseError': function(rejection) {
						if (rejection.data.error === 'InvalidCredentials') {
							$injector.get('notification').error('Invalid username or password.');
						} else if(rejection.data.error === 'UserAlreadyExists') {
							$injector.get('notification').error('Please choose a different username.', 'This username is already taken.');
						}

						return $q.reject(rejection);
					}
				}
			}]);
		}])

		.run(['$rootScope', '$location', 'notification', function($rootScope, $location, notification) {
			$rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
				
				if (rejection === 'Unauthorized Access') {
					notification.error('You must log in to view this page.');
				} else if (rejection === 'Must log out') {
					notification.error('You must log out to view this page.');
				}

				if (rejection === 'Unauthorized Access' || rejection === 'Must log out') {
					if (previous) {
						$location.path(previous.originalPath);	
					} else {
						$location.path('/login');
					}
				}
				
			});
		}])

		.constant('BASE_URL', 'https://baas.kinvey.com/')
		.constant('APP_KEY', 'kid_BJY6RO3tl');
})();