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
			'pageTitle',
			function($scope, $location, userIdentity, userAuthentication, pageTitle) {
				pageTitle.setTitle('Home');

				var isLoggedIn = userIdentity.isLoggedIn(); // Get this from rootScope?? And attach it in rootScope in MainCtrl??

				if (isLoggedIn) {
					userIdentity.getCurrentUser()
						.then(function(currentUser) {
							$scope.user = currentUser; // And this also..??
						});
				}
		}]);
})();