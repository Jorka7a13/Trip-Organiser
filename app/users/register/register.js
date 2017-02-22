(function() {
	'use strict';

	angular.module('tripOrganiser.users.register', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/register', {
			templateUrl: 'users/register/register.html',
			controller: 'usersRegisterController'
		})
	}])

	.controller('usersRegisterController', [
		'$scope', 
		function($scope) {
			$scope.register = function register() {
			}

			$scope.cancel = function cancel() {
			}
	}]);
})();