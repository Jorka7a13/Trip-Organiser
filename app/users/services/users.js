(function() {
	'use strict';

	angular.module('triplanner.users.users', [
		'triplanner.common.headers',
		'triplanner.users.userProfilePicture'
	])

		.factory('users', [
			'$http',
			'$q',
			'headers',
			'userProfilePicture',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, headers, userProfilePicture, BASE_URL, APP_KEY) {
				function getUser(userId) {
					var deferred = $q.defer();

					$http.get(BASE_URL + 'user/' + APP_KEY + '/' + userId, headers.setHeaders({'userAuthentication': true}))
						.then(function(userResult) {
							if (userResult.data.hasProfilePicture) {
								userProfilePicture.getProfilePicture(userResult.data._id)
									.then(function(profilePictureResult) {
										userResult.data.profilePictureUrl = profilePictureResult.data;
										deferred.resolve(userResult.data);
									})
							} else {
								deferred.resolve(userResult.data);
							}
						});

					return deferred.promise;
				}

				function updateUser(userId, userData) {
					var deferred = $q.defer();
					
					var profilePictureUrl;

					if (userData.profilePictureUrl) {
						profilePictureUrl = userData.profilePictureUrl;
						userData.profilePictureUrl = undefined; // Don't upload the profile picture URL with the "user" object.
						userData.hasProfilePicture = true;
					}

					$http.put(BASE_URL + 'user/' + APP_KEY + '/' + userId, userData, headers.setHeaders({'userAuthentication' : true}))
						.then(function(updatedUserResult) {
							if (profilePictureUrl) {
								userProfilePicture.updateProfilePicture(userData._id, profilePictureUrl)
									.then(function(updatedProfilePictureResult) {
										deferred.resolve(updatedUserResult.data);
									})
							} else {
								deferred.resolve(updatedUserResult.data);
							}
						})

					return deferred.promise;
				}

				return {
					getUser: getUser,
					updateUser: updateUser
				}
		}])
})();