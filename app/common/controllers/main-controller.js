(function() {
	'use strict';

	angular.module('tripOrganiser.main', [])

		.controller('MainCtrl', [
			'$scope',
			'$location',
			'userIdentity', 
			'userAuthentication',
			'pageTitle',
			function($scope, $location, userIdentity, userAuthentication, pageTitle) {
				var isLoggedIn = userIdentity.isLoggedIn();

				$scope.$on('$viewContentLoaded', function() { // On every ng-view change,
					$scope.pageTitle = pageTitle.getTitle(); // update the page title.
				});

				$scope.$on('$locationChangeStart', function(event) { // On every URL path change,
				    isLoggedIn = userIdentity.isLoggedIn(); // check if the user is logged in.
					$scope.isUserAuthenticated = isLoggedIn;

					if (isLoggedIn) {
						userIdentity.getCurrentUser()
							.then(function(currentUserResult) {
								$scope.currentUser = currentUserResult;
							});
					}
				});

				$scope.logout = function logout() {
					userAuthentication.logout()
						.then(function() {
							userIdentity.deleteCurrentUser();
							$location.path('/login');
						})
				}
		}]);
})();