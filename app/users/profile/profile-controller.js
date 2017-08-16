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
			'users',
			'userIdentity',
			function($scope, $routeParams, $location, pageOptions, users, userIdentity) {
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
							}
						})
				}

				$scope.editProfile = function editProfile() {
					$location.path('/edit-profile');
				}

				$scope.addFriend = function addFriend() {
					console.log('Friend added: ' + userId);
				}

				$scope.cancel = function cancel() {
					$location.path('/friends');
				}
		}])
})();