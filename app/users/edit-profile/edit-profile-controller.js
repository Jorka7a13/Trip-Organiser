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
			'users',
			'userProfilePicture',
			function($scope, $location, pageOptions, notification, userIdentity, users, userProfilePicture) {
				pageOptions.setOptions({title: 'Edit Profile'});

				var currentUser;
				var removedProfilePicture;

				if (userIdentity.isLoggedIn()) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							currentUser = currentUserResult;
							$scope.user = currentUser;
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

					users.updateUser(currentUser._id, updatedUser)
						.then(function(updatedUserResult) {
							notification.success('You have successfully updated your profile information, ' + updatedUserResult.username + '!');
							
							userIdentity.deleteCurrentUser(); // Clears the cached current user that has old profile info.
							$location.path('/profile/' + currentUser._id);

							if (removedProfilePicture && !currentUser.profilePictureUrl) {
								userProfilePicture.removeProfilePicture(currentUser._id)
									.then(function(removedProfilePictureResult) {
										console.log(removedProfilePictureResult);
										console.log('success');
									})
							}
						})
				}

				$scope.removeProfilePicture = function removeProfilePicture() {
					currentUser.profilePictureUrl = undefined;
					currentUser.hasProfilePicture = false;
					removedProfilePicture = true;
				}

				$scope.cancel = function cancel() {
					userIdentity.deleteCurrentUser(); // Clears the cached current user that has new profile info.
					$location.path('/profile/' + currentUser._id);
				}
		}])
})();