// A service responsible for getting data about users other than the currently logged in one.

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

				function findUser(query) {
					var deferred = $q.defer();
					var requestPayload = {};

					var emailValidation = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					
					if (emailValidation.test(query)) {
						requestPayload['email'] = query;
					} else {
						requestPayload['username'] = query;
					}

					$http.post(BASE_URL + 'user/' + APP_KEY + '/_lookup', requestPayload, headers.setHeaders({'userAuthentication': true}))
						.then(function(userResult) {
							deferred.resolve(userResult.data);
						});

					return deferred.promise;
				}

				return {
					getUser: getUser,
					findUser: findUser
				}
		}])
})();