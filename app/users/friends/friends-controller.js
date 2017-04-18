(function() {
	'use strict';

	angular.module('tripOrganiser.users.friends', [
		'ngRoute'
	])

		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				authenticated: ['$q', 'userIdentity', function($q, userIdentity) {
					if(!userIdentity.isLoggedIn()) {
						return $q.reject('Unauthorized Access');
					}
				}]
			}

			$routeProvider.when('/friends', {
				templateUrl: 'users/friends/friends.html',
				controller: 'FriendsCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('FriendsCtrl', [
			'$scope',
			'pageTitle',
			function($scope, pageTitle) {
				pageTitle.setTitle('Friends');
		}]);
})();