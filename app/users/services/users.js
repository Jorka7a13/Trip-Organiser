(function() {
	'use strict';

	angular.module('triplanner.users.users', [
		'triplanner.authorizationHeader'
	])

		.factory('users', [
			'$http',
			'$q',
			'authorizationHeader',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, authorizationHeader, BASE_URL, APP_KEY) {
				function getUser(userId) {
					var deferred = $q.defer();

					$http.get(BASE_URL + 'user/' + APP_KEY + '/' + userId, authorizationHeader.setAuthorizationHeader())
						.then(function(result) {
							deferred.resolve(result.data);
						});

					return deferred.promise;
				}

				function updateUser(userId, userData) {
					var deferred = $q.defer();

					$http.put(BASE_URL + 'user/' + APP_KEY + '/' + userId, userData, authorizationHeader.setAuthorizationHeader())
						.then(function(result) {
							deferred.resolve(result.data);
						})

					return deferred.promise;
				}

				return {
					getUser: getUser,
					updateUser: updateUser
				}
		}])
})();