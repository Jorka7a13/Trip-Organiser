(function() {
	
	'use strict';

	angular.module('tripOrganiser.users.userAuthentication', ['ngStorage', 'base64', 'tripOrganiser.authorizationHeader'])

		.factory('userAuthentication', [
			'$http', 
			'$q',
			'BASE_URL',
			'APP_KEY',
			'authorizationHeader',
			function($http, $q, BASE_URL, APP_KEY, authorizationHeader) {

				function login(user) {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY + '/login', user, authorizationHeader.setAuthorizationHeader(false))
						.then(function(result) {
							deferred.resolve(result.data);
						}, function(error) {
						});

					return deferred.promise;
				}

				function register(user) {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY, user, authorizationHeader.setAuthorizationHeader(false))
						.then(function(result) {
							deferred.resolve(result.data);
						}, function(error) {
						});

					return deferred.promise;
				}

				function logout() {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY + '/_logout', user, authorizationHeader.setAuthorizationHeader(true))
						.then(function(result) {
							deferred.resolce(result);
						}, function(error) {
						});

					return deferred.promise;
				}

				return {
					login: login,
					register: register,
					logout: logout
				}
		}]);

})();