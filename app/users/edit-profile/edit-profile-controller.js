(function() {
	'use strict';

	angular.module('triplanner.users.editProfile', [
		'ngRoute',
		'triplanner.users.userProfilePicture'
	])

		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				authenticated: ['$q', 'userIdentity', function($q, userIdentity) {
					if (!userIdentity.isLoggedIn()) {
						return $q.reject('Unauthorized Access');
					}
				}]
			}

			$routeProvider.when('/edit-profile', {
				templateUrl: 'users/edit-profile/edit-profile.html',
				controller: 'EditProfileCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('EditProfileCtrl', [
			'$scope',
			'$location',
			'pageOptions',
			'notification',
			'userIdentity',
			'userProfilePicture',
			function($scope, $location, pageOptions, notification, userIdentity, userProfilePicture) {
				pageOptions.setOptions({title: 'Edit Profile'});

				var currentUser;
				var removedProfilePicture;

				if (userIdentity.isLoggedIn()) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							currentUser = currentUserResult;
							$scope.user = angular.copy(currentUser);
						})
				}

				$scope.save = function save() {
					var updatedUser = angular.copy($scope.user);

					if (updatedUser.sex == 'None') { // If the user removes their 'sex', don't send 'None' to the server.
						updatedUser.sex = undefined;
					}

					if (updatedUser.age == '') { // If the user removes their 'age', don't send an empty string to the server.
						updatedUser.age = undefined;
					}

					userIdentity.updateCurrentUser(updatedUser)
						.then(function(updatedUserResult) {
							notification.success('You have successfully updated your profile information, ' + updatedUserResult.username + '!');
							
							$location.path('/profile/' + currentUser._id);

							if (removedProfilePicture && !$scope.user.profilePictureUrl) {
								userProfilePicture.removeProfilePicture(currentUser._id);
							}
						})
				}

				$scope.removeProfilePicture = function removeProfilePicture() {
					$scope.user.profilePictureUrl = undefined;
					$scope.user.hasProfilePicture = false;
					removedProfilePicture = true;
				}

				$scope.cancel = function cancel() {
					$location.path('/profile/' + currentUser._id);
				}
		}])
})();