(function() {
	'use strict';

	angular.module('tripOrganiser.pageTitle', [])

		.factory('pageTitle', [function() {
				var title = '';

				function setTitle(title) {
					this.title = title;
				}

				function getTitle() {
					return this.title;
				}

				return {
					setTitle: setTitle,
					getTitle: getTitle
				}
		}]);
})();