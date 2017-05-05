(function() {
	'use strict';

	angular.module('tripOrganiser.users.users', [
		'tripOrganiser.authorizationHeader'
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

				return {
					getUser : getUser
				}
		}])
})();