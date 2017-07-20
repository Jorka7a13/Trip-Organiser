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
			'searchQuery',
			'users',
			function($scope, pageOptions, searchQuery, users) {
				pageOptions.setOptions({title: 'Friends', usersSearchBar: true});

				$scope.$watch(function() {
						return searchQuery.getUserSearchQuery() // Watch for changes on the users searchQuery.
					}, function(newValue, oldValue) {
						if (oldValue != newValue) { // If the users searchQuery has changed.
							users.findUser(newValue)
								.then(function(findUsersResult) {
									if (findUsersResult.length > 0) {
										$scope.searchResults = findUsersResult;
									} else {
										$scope.searchResults = 'No results.';
										console.log('No results.');
									}
								})
						}
				});
		}]);
})();