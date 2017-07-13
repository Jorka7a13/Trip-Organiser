(function() {
	'use strict';

    angular.module('triplanner.common.imageInput', [])

    	.directive('imageInput', [
    		'$parse',
    		function($parse) {
    			return {
			        restrict: 'A',
			        link: function(scope, element, attrs) {
						var model = $parse(attrs.imageInput);
						var fileReader = new FileReader();

						element.on('change', function() {
							fileReader.onload = function(e) {
								scope.$apply(function() {
									model.assign(scope, fileReader.result); // Changes the model.
								});
							}

							if (element[0].files[0]) {
								fileReader.readAsDataURL(element[0].files[0]);
							}
						});
			        }
			    };
		}]);
})();