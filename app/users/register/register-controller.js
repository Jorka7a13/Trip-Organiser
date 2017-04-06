(function() {
	'use strict';

	angular.module('tripOrganiser.users.register', [
		'ngRoute',
		'tripOrganiser.users.userAuthentication'
	])

		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				notAuthenticated: ['$q', 'userIdentity', function($q, userIdentity) {
					if (userIdentity.isLoggedIn()) {
						return $q.reject('Must log out');
					}
				}]
			}

			$routeProvider.when('/register', {
				templateUrl: 'users/register/register.html',
				controller: 'RegisterCtrl',
				resolve: routeChecks.notAuthenticated
			})
		}])

		.controller('RegisterCtrl', [
			'$scope', 
			'$location',
			'notification',
			'userAuthentication',
			'userIdentity',
			function($scope, $location, notification, userAuthentication, userIdentity) {
				$scope.register = function register() {
					userAuthentication.register($scope.user)
						.then(function(registeredUser) {
							notification.success('You have registered successfully!');
							$location.path('/login');
						});
				}

				$scope.cancel = function cancel() {
					$location.path('/login');
				}
		}]);
})();