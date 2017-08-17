// A service responsible for setting headers for http requests. 

(function() {
	'use strict';

	angular.module('triplanner.common.headers', [
		'ngStorage', 
		'base64'
	])

		.factory('headers', [
			'$localStorage',
			'$base64',
			'APP_KEY',
			function($localStorage, $base64, APP_KEY) {
				function setHeaders(headers) {
					var headersConfig = {}

					for (var header in headers) {
					    if (headers.hasOwnProperty(header)) {
					        switch (header) {
							    case 'userAuthentication':
							    	setUserAuthenticationHeader();
							        break;
							    case 'appAuthentication':
							        setAppAuthenticationHeader();
							        break;
						        case 'contentLength':
						        	setContentLengthHeader(headers[header]);
						        	break;
				        		case 'contentType':
				        			setContentTypeHeader(headers[header]);
				        			break;
			        			case 'kinveyContentType':
			        				setKinveyContentType(headers[header]);
			        				break;
							    default:
							    	headersConfig[header] = headers[header]; // Set the header as it was passed. 
							}
						}
					}

					return {
						'headers': headersConfig
					};

					function setUserAuthenticationHeader() {
						headersConfig['Authorization'] = 'Kinvey ' + $localStorage.authtoken;
					}

					function setAppAuthenticationHeader() {
						var appSecret = '9abeb47b58f24f6cbb9ff0bf3c650f89';
						headersConfig['Authorization'] = 'Basic ' + $base64.encode(APP_KEY + ':' + appSecret);
					}

					function setContentLengthHeader(contentLength) {
						headersConfig['Content-Length'] = contentLength;
					}

					function setContentTypeHeader(contentType) {
						headersConfig['Content-Type'] = contentType;
					}

					function setKinveyContentType(contentType) {
						headersConfig['X-Kinvey-Content-Type'] = contentType;
					}
				}

				return {
					setHeaders: setHeaders
				}
		}])
})();