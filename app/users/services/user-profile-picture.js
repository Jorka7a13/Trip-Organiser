// A service responsible for managing the profile picture data of a user.

(function() {
	'use strict';

	angular.module('triplanner.users.userProfilePicture', [
		'triplanner.common.headers',
	])

		.factory('userProfilePicture', [
			'$http',
			'$q',
			'headers',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, headers, BASE_URL, APP_KEY) {
				function getProfilePicture(userId) {
					var deferred = $q.defer();

					$http.get(BASE_URL + 'blob/' + APP_KEY + '/' + userId + 'pic', headers.setHeaders({'userAuthentication' : true})) // It needs 'pic' at the end of the URL because if the URL is the same as the userId it won't find the blob.
						.then(function(result) {
							return $http.get(result.data._downloadURL)
						})
						.then(function(result) {
							deferred.resolve(result);
						})

					return deferred.promise;
				}

				function updateProfilePicture(userId, profilePictureUrl) {
					var deferred = $q.defer();

					var kinveyRequestConfig = {
						'_acl' : {
							'gr': true // Setting the profile picture as "global read" so that everyone can access it.
						}
					}

					$http.put(BASE_URL + 'blob/' + APP_KEY + '/' + userId + 'pic', kinveyRequestConfig, headers.setHeaders({'userAuthentication' : true, 'kinveyContentType' : 'image/jpeg'}))
						.then(function(result) {
							var googleRequestHeaders = {};
							googleRequestHeaders.headers = {};

							if (Object.keys(result.data._requiredHeaders).length > 0) { // If there are some required headers.
								googleRequestHeaders = headers.setHeaders(result.data._requiredHeaders);
							}

							var mediaType = profilePictureUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
							if (mediaType && mediaType.length) {
								mediaType = mediaType[1];
							} else {
								mediaType = 'image/jpeg';
							}

							var contentTypeHeader = headers.setHeaders({'contentType' : mediaType}).headers;
							googleRequestHeaders.headers[Object.keys(contentTypeHeader)[0]] = contentTypeHeader[Object.keys(contentTypeHeader)[0]]; // Add this header to googleRequestHeaders, instead of overriding the whole headers object.

							return $http.put(result.data._uploadURL, profilePictureUrl, googleRequestHeaders)
						})
						.then(function(result) {
							deferred.resolve(result.data);
						})

					return deferred.promise;
				}

				function removeProfilePicture(userId) {
					var deferred = $q.defer();

					$http.delete(BASE_URL + 'blob/' + APP_KEY + '/' + userId + 'pic', headers.setHeaders({'userAuthentication' : true}))
						.then(function(result) {
							deferred.resolve(result.data);
						})

					return deferred.promise;
				}

				return {
					getProfilePicture: getProfilePicture,
					updateProfilePicture: updateProfilePicture,
					removeProfilePicture: removeProfilePicture
				}
		}])
})();