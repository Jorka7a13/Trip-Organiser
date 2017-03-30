(function() {
	'use strict';

	angular.module('tripOrganiser.home', [
		'ngRoute',
		'tripOrganiser.users.userAuthentication'
	])

		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				authenticated: ['$q', 'userIdentity', function($q, userIdentity) {
					if(!userIdentity.isLoggedIn()) {
						return $q.reject('Unauthorized Access');
					}
				}]
			}

			$routeProvider.when('/home', {
				templateUrl: 'home/home.html',
				controller: 'HomeCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('HomeCtrl', [
			'$scope',
			'$location',
			'userIdentity',
			'userAuthentication',
			function($scope, $location, userIdentity, userAuthentication) {
				var isLoggedIn = userIdentity.isLoggedIn();
				$scope.isLoggedIn = isLoggedIn;

				if (isLoggedIn) {
					userIdentity.getCurrentUser()
						.then(function(currentUser) {
							$scope.user = currentUser;
						});
				}

				$scope.logout = function logout() {
					userAuthentication.logout()
						.then(function() {
							userIdentity.deleteCurrentUser();
							$location.path('/login');
						})
				}
		}]);
})();