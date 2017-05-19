(function() {
	'use strict';

	angular.module('triplanner.users.userAuthentication', [
		'ngStorage',
		'triplanner.authorizationHeader'
	])

		.factory('userAuthentication', [
			'$http', 
			'$q',
			'$localStorage',
			'authorizationHeader',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, $localStorage, authorizationHeader, BASE_URL, APP_KEY) {
				function login(user) {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY + '/login', user, authorizationHeader.setAuthorizationHeader(true))
						.then(function(result) {
							$localStorage.authtoken = result.data._kmd.authtoken;
							deferred.resolve(result.data);
						});

					return deferred.promise;
				}

				function register(user) {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY, user, authorizationHeader.setAuthorizationHeader(true))
						.then(function(result) {
							deferred.resolve(result.data);
						});

					return deferred.promise;
				}

				function logout() {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY + '/_logout', {}, authorizationHeader.setAuthorizationHeader())
						.then(function(result) {
							delete $localStorage.authtoken;
							deferred.resolve(result);
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