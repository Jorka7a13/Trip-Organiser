(function() {
	'use strict';

	angular.module('triplanner.users.friends', [
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
			'pageOptions',
			function($scope, pageOptions) {
				pageOptions.setOptions({title: 'Friends', friendsSearchBar: true});
		}]);
})();