(function() {
	'use strict';

	angular.module('triplanner.common.tooltip', [])

		.directive('tooltip', [
			function() {
				return {
					restrict: 'A',
					link: function(scope, element, attrs) {
						$("[data-toggle=tooltip]").tooltip({container: 'body'});
					}
				}
		}]);
})();