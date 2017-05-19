(function() {
	'use strict';

	angular.module('triplanner.users.userIdentity', [
		'ngStorage',
		'triplanner.authorizationHeader'
	])

		.factory('userIdentity', [
			'$http',
			'$q',
			'$localStorage',
			'authorizationHeader',
			'BASE_URL',
			'APP_KEY',
			function($http, $q, $localStorage, authorizationHeader, BASE_URL, APP_KEY) {
				var currentUser; // Cache the current user after the first request to get it.

				function getCurrentUser() {
					var deferred = $q.defer();

					if (currentUser) {
						return $q.when(currentUser);
					} else {
						$http.get(BASE_URL + 'user/' + APP_KEY + '/_me', authorizationHeader.setAuthorizationHeader())
							.then(function(result) {
								currentUser = result.data;
								deferred.resolve(currentUser);
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