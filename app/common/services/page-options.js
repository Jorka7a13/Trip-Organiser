// A service responsible for transmitting config data about the current page. 

(function() {
	'use strict';

	angular.module('triplanner.common.pageOptions', [])

		.factory('pageOptions', [
			function() {
				var pageOptions = {};

				function setOptions(pageOptions) {
					this.pageOptions = pageOptions;
				}

				function getOptions() {
					return this.pageOptions;
				}

				return {
					setOptions: setOptions,
					getOptions: getOptions
				}
		}]);
})();