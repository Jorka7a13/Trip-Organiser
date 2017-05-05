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
			'userIdentity',
			'pageTitle',
			function($scope, userIdentity, pageTitle) {
				pageTitle.setTitle('Home');

				var isLoggedIn = userIdentity.isLoggedIn();

				if (isLoggedIn) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							$scope.user = currentUserResult;
						});
				}
		}]);
})();