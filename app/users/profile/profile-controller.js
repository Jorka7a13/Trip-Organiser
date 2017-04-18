(function() {
	"use strict";

	angular.module('tripOrganiser.users.profile', [
		'ngRoute'
	])

		.config(['$routeProvider', function($routeProvider) {
			var routeChecks = {
				authenticated: ['$q', 'userIdentity', function($q, userIdentity) {
					if (!userIdentity.isLoggedIn()) {
						return $q.reject('Unauthorized Access');
					}
				}]
			}

			$routeProvider.when('/profile', {
				templateUrl: 'users/profile/profile.html',
				controller: 'ProfileCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('ProfileCtrl', [
			'$scope',
			'pageTitle',
			function($scope, pageTitle) {
				pageTitle.setTitle('Profile');
		}])
})();