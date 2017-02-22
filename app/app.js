(function() {
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('tripOrganiser', [
	  'ngRoute',
	  'tripOrganiser.users.login',
	  'tripOrganiser.users.register',
	  'tripOrganiser.home'
	])

	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  $locationProvider.hashPrefix('!');

	  $routeProvider.otherwise({redirectTo: '/home'});
	}]);
})();