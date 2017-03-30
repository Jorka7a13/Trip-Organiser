(function() {
	'use strict';

	angular.module('tripOrganiser.users.login', [
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

			$routeProvider.when('/login', {
				templateUrl: 'users/login/login.html',
				controller: 'UsersLoginCtrl',
				resolve: routeChecks.notAuthenticated
			})
		}])

		.controller('UsersLoginCtrl', [
			'$scope',
			'$location',
			'userAuthentication',
			'userIdentity',
			function($scope, $location, userAuthentication, userIdentity) {
				$scope.login = function login() {
					userAuthentication.login($scope.user)
						.then(function() {
							$location.path('/home');
						});
				}

				$scope.register = function register() {
					$location.path('/register');
				}
		}]);
})();