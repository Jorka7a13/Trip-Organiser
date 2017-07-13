(function() {
	'use strict';

	angular.module('triplanner.users.userAuthentication', [
		'ngStorage',
		'triplanner.common.headers'
	])

		.factory('userAuthentication', [
			'$http', 
			'$q',
			'$localStorage',
			'headers',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, $localStorage, headers, BASE_URL, APP_KEY) {
				function login(user) {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY + '/login', user, headers.setHeaders({'appAuthentication' : true}))
						.then(function(result) {
							$localStorage.authtoken = result.data._kmd.authtoken;
							deferred.resolve(result.data);
						});

					return deferred.promise;
				}

				function register(user) {
					var deferred = $q.defer();

					user.hasProfilePicture = false;
					
					$http.post(BASE_URL + 'user/' + APP_KEY, user, headers.setHeaders({'appAuthentication' : true}))
						.then(function(result) {
							deferred.resolve(result.data);
						});

					return deferred.promise;
				}

				function logout() {
					var deferred = $q.defer();

					$http.post(BASE_URL + 'user/' + APP_KEY + '/_logout', {}, headers.setHeaders({'userAuthentication' : true}))
						.then(function(result) {
							delete $localStorage.authtoken;
							deferred.resolve(result.data);
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