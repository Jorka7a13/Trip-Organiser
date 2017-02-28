(function() {
	'use strict';

	angular.module('tripOrganiser.users.login', [
		'ngRoute', 
		'tripOrganiser.users.userAuthentication'
	])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'users/login/login.html',
			controller: 'UsersLoginCtrl'
		})
	}])

	.controller('UsersLoginCtrl', [
		'$scope',
		'$location',
		'$sessionStorage',
		'userAuthentication',
		function($scope, $location, $sessionStorage, userAuthentication) {

			$scope.login = function login() {
				userAuthentication.login($scope.user)
					.then(function(loggedInUser) {
						console.log("You have logged in! " + loggedInUser);
						$sessionStorage.authtoken = loggedInUser._kmd.authtoken; //??HERE OR IN user-authentication.js??
						$location.path('/home');
					});
			}

			$scope.register = function register() {
				$location.path('/register');
			}
	}]);
})();