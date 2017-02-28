(function() {

	'use strict';

	angular.module('tripOrganiser.authorizationHeader', [])

	.factory('authorizationHeader', [
		'$base64',
		'APP_KEY',
		function($base64, APP_KEY) {

			function setAuthorizationHeader(sessionAuth) {
				var authorizationHeader = '';
				var authentication = '';
				var credentials = '';

				if (sessionAuth) {
					authentication = 'Kinvey '; 
					credentials = $sessionStorage.authtoken;
				} else {
					var appSecret = '9abeb47b58f24f6cbb9ff0bf3c650f89';

					authentication = 'Basic ';
					credentials = $base64.encode(APP_KEY + ':' + appSecret);
				}

				authorizationHeader = authentication + credentials;

				var config = {
					'headers': {
						'Authorization': authorizationHeader
					}
				}

				return config;
			}

			return {
				setAuthorizationHeader: setAuthorizationHeader
			}
	}])
})();