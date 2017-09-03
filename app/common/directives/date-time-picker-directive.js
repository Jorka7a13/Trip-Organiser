(function() {
	'use strict';

	angular.module('triplanner.common.dateTimePicker', [])

		.directive('dateTimePicker', [
			function() {
				return {
					restrict: 'A',
					link: function(scope, element, attrs) {
		                // $('#datetimepicker1').datetimepicker({
		                //     pick12HourFormat: scope.pick12HourFormat,
		                //     language: scope.language,
		                //     useCurrent: scope.useCurrent
		                // }); // Change '#datetimepicker1' to '[date-time-picker]'.
		                
		                console.log($('#datetimepicker1'));
		                console.log($('#datetimepicker1').datetimepicker);

	             		element.on('blur', function() {
			                // scope.departureDateTime = new Date(element.data('DateTimePicker').getDate().format());
							console.log(element.data('DateTimePicker'));

							// scope.$apply();
						});
					}
				}
		}]);
})();