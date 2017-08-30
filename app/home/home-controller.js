(function() {
	'use strict';

	angular.module('triplanner.home', [
		'ngRoute',
		'triplanner.users.userAuthentication'
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
			'pageOptions',
			'userIdentity',
			function($scope, $location, pageOptions, userIdentity) {
				pageOptions.setOptions({title: 'Home'});

				var isLoggedIn = userIdentity.isLoggedIn();

				if (isLoggedIn) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							$scope.user = currentUserResult;
						});
				}

				$scope.goToPlanATrip = function goToPlanATrip() {
					$location.path('/plan-a-trip');
				}
		}]);
})();