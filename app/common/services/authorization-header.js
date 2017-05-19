(function() {
	'use strict';

	angular.module('triplanner.authorizationHeader', [
		'ngStorage', 
		'base64'
	])

		.factory('authorizationHeader', [
			'$localStorage',
			'$base64',
			'APP_KEY',
			function($localStorage, $base64, APP_KEY) {
				function setAuthorizationHeader(basicAuth) {
					var authorizationHeader = '';
					var authentication = '';
					var credentials = '';

					if (basicAuth) {
						var appSecret = '9abeb47b58f24f6cbb9ff0bf3c650f89';

						authentication = 'Basic ';
						credentials = $base64.encode(APP_KEY + ':' + appSecret);
					} else {
						authentication = 'Kinvey '; 
						credentials = $localStorage.authtoken;
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