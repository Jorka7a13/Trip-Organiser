// A service responsible for generating toastr notifications. 

(function() {
	'use strict';

	angular.module('triplanner.common.notification', [
		'toastr',
		'ngAnimate'
	])

		.config(['toastrConfig', function(toastrConfig) {
			angular.extend(toastrConfig, {
			    extendedTimeOut: 1000,
			    timeOut: 2000
			});
		}])

		.factory('notification', [
			'toastr',
			function(toastr) {
				function success(message, header) {
					toastr.success(message, header);
				}

				function info(message, header) {
					toastr.info(message, header);
				}

				function warning(message, header) {
					toastr.warning(message, header);
				}

				function error(message, header) {
					toastr.error(message, header);
				}

				return {
					success: success,
					info: info,
					warning: warning,
					error: error
				}
		}])
})();