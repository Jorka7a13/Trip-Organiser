(function() {
	'use strict';

	angular.module('tripOrganiser.users.register', [
		'ngRoute',
		'tripOrganiser.users.userAuthentication'
	])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/register', {
			templateUrl: 'users/register/register.html',
			controller: 'UsersRegisterCtrl'
		})
	}])

	.controller('UsersRegisterCtrl', [
		'$scope', 
		'$location',
		'userAuthentication',
		function($scope, $location, userAuthentication) {

			$scope.register = function register() {
				userAuthentication.register($scope.user)
					.then(function(registeredUser) {
						console.log('You have registered! ' + registeredUser);
						//Send a notification to the user that they have registered successfully
						$location.path('/login');
					});
			}

			$scope.cancel = function cancel() {
				$location.path('/login');
			}
	}]);
})();