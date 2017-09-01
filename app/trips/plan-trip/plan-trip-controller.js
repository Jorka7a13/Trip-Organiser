(function() {
	'use strict';

	angular.module('triplanner.trips.planTrip', [
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

			$routeProvider.when('/plan-a-trip', {
				templateUrl: 'trips/plan-trip/plan-trip.html',
				controller: 'PlanTripCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('PlanTripCtrl', [
			'$scope',
			'pageOptions',
			function($scope, pageOptions) {
				pageOptions.setOptions({title: 'Plan a trip'});

				$scope.trip = {}

				$scope.addDepartureDateAndTime = function addDepartureDateAndTime() {

				}
		}])
})();