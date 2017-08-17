// A service responsible for getting information about the currently logged in user.

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

				function deleteCurrentUser() { // Clear the cached current user.
					currentUser = undefined;
				}

				function isLoggedIn() {
					return !!$localStorage.authtoken; // If there is an 'authtoken' in Session storage, then the user must be logged in.
				}

				return {
					getCurrentUser: getCurrentUser,
					deleteCurrentUser: deleteCurrentUser,
					isLoggedIn: isLoggedIn
				}
		}]);
})();