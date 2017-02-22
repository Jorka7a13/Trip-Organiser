(function() {
	'use strict';

	angular.module('tripOrganiser.users.login', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'users/login/login.html',
			controller: 'usersLoginController'
		})
	}])

	.controller('usersLoginController', [
		'$scope',
		'$location',
		function($scope, $location) {
			$scope.login = function login() {
			}

			$scope.register = function register() {
				$location.path("/register");
			}
	}]);
})();