(function() {
	'use strict';

	angular.module('tripOrganiser', [
	  'ngRoute',
	  'tripOrganiser.users.login',
	  'tripOrganiser.users.register',
	  'tripOrganiser.home'
	])

	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  $locationProvider.hashPrefix('!');

	  $routeProvider.otherwise({redirectTo: '/home'});
	}])

	.constant('BASE_URL', 'https://baas.kinvey.com/')
	.constant('APP_KEY', 'kid_BJY6RO3tl');
})();