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
			'$location',
			'pageOptions',
			'searchQuery',
			'users',
			'userIdentity',
			function($scope, $location, pageOptions, searchQuery, users, userIdentity) {
				pageOptions.setOptions({title: 'Friends', usersSearchBar: true});

				$scope.friends = [];

				if (userIdentity.isLoggedIn()) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							if (currentUserResult.friends.length > 0) {
								$scope.hasFriends = true;

								for (var friendIndex = 0; friendIndex < currentUserResult.friends.length; friendIndex++) {
									users.getUser(currentUserResult.friends[friendIndex])
										.then(function(userResult) {
											$scope.friends.push(userResult);
										})
								}
							}
						})
				}

				$scope.$watch(function() {
						return searchQuery.getUserSearchQuery() // Watch for changes on the users searchQuery.
					}, function(newValue, oldValue) {
						if (newValue != undefined) {
							if (oldValue != newValue) { // If the users searchQuery has changed.
								$scope.searchResults = [];
								$scope.foundResults = true;

								users.findUser(newValue)
									.then(function(findUsersResult) {
										if (findUsersResult.length > 0) {
											$scope.foundResults = true;

											for (var userIndex = 0; userIndex < findUsersResult.length; userIndex++) {
												users.getUser(findUsersResult[userIndex]._id)
													.then(function(userResult) {
														$scope.searchResults.push(userResult);
													})
											}
										} else {
											$scope.foundResults = false;
										}
									})
									.finally(function() {
										searchQuery.setUserSearchQuery(undefined); // Clears the search query so that when the user does a second consecutive search for the same query, the watch will catch a change.
									})
							}
						}
				});

				$scope.goToUserProfile = function goToUserProfile(userId) {
					$location.path('/profile/' + userId);
				}
		}]);
})();