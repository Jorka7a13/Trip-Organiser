(function() {
	'use strict';

	angular.module('triplanner.users.profile', [
		'ngRoute'
	])

		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				authenticated: ['$q', 'userIdentity', function($q, userIdentity) {
					if (!userIdentity.isLoggedIn()) {
						return $q.reject('Unauthorized Access');
					}
				}]
			}

			$routeProvider.when('/profile/:userId', {
				templateUrl: 'users/profile/profile.html',
				controller: 'ProfileCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('ProfileCtrl', [
			'$scope',
			'$routeParams',
			'$location',
			'pageOptions',
			'notification',
			'users',
			'userIdentity',
			function($scope, $routeParams, $location, pageOptions, notification, users, userIdentity) {
				pageOptions.setOptions({title: 'Profile'});

				var userId = $routeParams.userId;
				if (userIdentity.isLoggedIn()) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							if (currentUserResult._id === userId) { // If the user is looking at their own profile page.
								$scope.isOwnProfile = true;
								$scope.user = currentUserResult;
							} else { // If the user is looking at another profile page.
								$scope.isOwnProfile = false;
								users.getUser(userId)
									.then(function(userResult) {
										$scope.user = userResult;
									})

								if(currentUserResult.friends.indexOf(userId) !== -1) { // If the user is a friend of the currently logged in user.
									$scope.isFriend = true;
								}
							}
						})
				}

				$scope.editProfile = function editProfile() {
					$location.path('/edit-profile');
				}

				$scope.addFriend = function addFriend() {
					userIdentity.addFriend($scope.user._id)
						.then(function(friendAddedResult) {
							notification.success($scope.user.username + ' is now your friend!');
							$location.path('/friends');
						})
				}

				$scope.removeFriend = function removeFriend() {
					userIdentity.removeFriend($scope.user._id)
						.then(function(friendRemovedResult) {
							notification.success($scope.user.username + ' is no longer your friend!');
							$location.path('/friends');
						})
				}

				$scope.cancel = function cancel() {
					$location.path('/friends');
				}
		}])
})();