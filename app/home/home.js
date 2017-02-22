(function() {
	'use strict';

	angular.module('tripOrganiser.home', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'homeController'
		})
	}])

	.controller('homeController', [
		'$scope', 
		function($scope) {
	}]);
})();