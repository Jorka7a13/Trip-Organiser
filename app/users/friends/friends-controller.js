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
			function($scope, $location, pageOptions, searchQuery, users) {
				pageOptions.setOptions({title: 'Friends', usersSearchBar: true});

				$scope.$watch(function() {
						return searchQuery.getUserSearchQuery() // Watch for changes on the users searchQuery.
					}, function(newValue, oldValue) {
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
						}
				});

				$scope.goToUserProfile = function goToUserProfile(userId) {
					$location.path('/profile/' + userId);
				}
		}]);
})();