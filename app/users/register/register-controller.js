(function() {
	'use strict';

	angular.module('triplanner.users.register', [
		'ngRoute',
		'triplanner.users.userAuthentication'
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
			function($scope, $location, notification, userAuthentication) {
				$scope.register = function register() {
					userAuthentication.register($scope.user)
						.then(function(registeredUserResult) {
							notification.success('You have registered successfully, ' + registeredUserResult.username + '!');
							$location.path('/login');
						});
				}

				$scope.cancel = function cancel() {
					$location.path('/login');
				}
		}]);
})();