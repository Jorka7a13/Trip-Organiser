// A service responsible for managing data about the currently logged in user.

(function() {
	'use strict';

	angular.module('triplanner.users.userIdentity', [
		'ngStorage',
		'triplanner.common.headers',
		'triplanner.users.userProfilePicture'
	])

		.factory('userIdentity', [
			'$http',
			'$q',
			'$localStorage',
			'userProfilePicture',
			'headers',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, $localStorage, userProfilePicture, headers, BASE_URL, APP_KEY) {
				var currentUser; // Cache the current user after the first request to get it.

				function getCurrentUser() {
					var deferred = $q.defer();

					if (currentUser) {
						return $q.when(currentUser);
					} else {
						$http.get(BASE_URL + 'user/' + APP_KEY + '/_me', headers.setHeaders({'userAuthentication' : true}))
							.then(function(currentUserResult) {
								currentUser = currentUserResult.data;

								if (currentUser.hasProfilePicture) {
									userProfilePicture.getProfilePicture(currentUser._id)
										.then(function(profilePictureUrlResult) {
											currentUser.profilePictureUrl = profilePictureUrlResult.data;
											deferred.resolve(currentUser);
										})
								} else {
									deferred.resolve(currentUser);
								}
							});

						return deferred.promise;
					}
				}

				function updateCurrentUser(userData) {
					var deferred = $q.defer();
					
					var profilePictureUrl;

					if (userData.profilePictureUrl) {
						// if (!currentUser.profilePictureUrl || currentUser.profilePictureUrl != userData.profilePictureUrl) { // If the profile picture is a new one.
							profilePictureUrl = userData.profilePictureUrl;
							userData.profilePictureUrl = undefined; // Don't upload the profile picture URL with the "user" object.
							userData.hasProfilePicture = true;
						// }
					}

					$http.put(BASE_URL + 'user/' + APP_KEY + '/' + currentUser._id, userData, headers.setHeaders({'userAuthentication' : true}))
						.then(function(updatedUserResult) {
							currentUser = updatedUserResult.data;

							if (profilePictureUrl) {
								userProfilePicture.updateProfilePicture(userData._id, profilePictureUrl)
									.then(function(updatedProfilePictureResult) {
										currentUser.profilePictureUrl = profilePictureUrl;
										deferred.resolve(updatedUserResult.data);
									})
							} else {
								deferred.resolve(updatedUserResult.data);
							}
						})

					return deferred.promise;
				}

				function addFriend(userId) {
					var deferred = $q.defer();

					if (currentUser.friends.indexOf(userId) == -1) { // The currently logged in user doesn't have this user in their friends list.
						currentUser.friends.push(userId);

						this.updateCurrentUser(currentUser)
							.then(function(updatedUserResult) {
								deferred.resolve(updatedUserResult);
							})
					}

					return deferred.promise;
				}

				function removeFriend(userId) {
					var deferred = $q.defer();

					var userIndex = currentUser.friends.indexOf(userId);
					if (userIndex > -1) { // If the friend is in the currently logged in user's friend list. 
						currentUser.friends.splice(userIndex, 1);
					} else {
						deferred.reject('Cannot remove friend. User ' + userId + ' is not in the currently logged in user\'s friend list. ');
					}

					this.updateCurrentUser(currentUser)
						.then(function(updatedUserResult) {
							deferred.resolve(updatedUserResult);
						})

					return deferred.promise;
				}

				function deleteCurrentUser() { // Clear the cached current user.
					currentUser = undefined;
				}

				function isLoggedIn() {
					return !!$localStorage.authtoken; // If there is an 'authtoken' in Session storage, then the user must be logged in.
				}

				return {
					getCurrentUser: getCurrentUser,
					updateCurrentUser: updateCurrentUser,
					addFriend: addFriend,
					removeFriend: removeFriend,
					deleteCurrentUser: deleteCurrentUser,
					isLoggedIn: isLoggedIn
				}
		}]);
})();