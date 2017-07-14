(function() {
	'use strict';

	angular.module('triplanner.common.main', [])

		.controller('MainCtrl', [
			'$scope',
			'$location',
			'userIdentity', 
			'userAuthentication',
			'pageOptions',
			function($scope, $location, userIdentity, userAuthentication, pageOptions) {
				$scope.pageOptions = {}
				var isLoggedIn = userIdentity.isLoggedIn();

				$scope.$on('$viewContentLoaded', function() { // On every ng-view change,
					$scope.pageOptions.pageTitle = pageOptions.getOptions().title; // update the page title.

				 	if (pageOptions.getOptions().friendsSearchBar) {
						$scope.pageOptions.friendsSearchBar = true;
					} else {
						$scope.pageOptions.friendsSearchBar = false;
					}
				});

				$scope.$on('$locationChangeStart', function() { // On every URL path change,
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