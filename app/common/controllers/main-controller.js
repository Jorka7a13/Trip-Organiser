(function() {
	'use strict';

	angular.module('triplanner.common.main', [])

		.controller('MainCtrl', [
			'$scope',
			'$location',
			'pageOptions',
			'searchQuery',
			'userIdentity', 
			'userAuthentication',
			function($scope, $location, pageOptions, searchQuery, userIdentity, userAuthentication) {
				$scope.pageOptions = {}
				$scope.search = {}
				var isLoggedIn = userIdentity.isLoggedIn();

				$scope.$on('$viewContentLoaded', function() { // On every ng-view change.
					$scope.pageOptions = pageOptions.getOptions(); // Update the page options.
				});

				$scope.$on('$locationChangeStart', function() { // On every URL path change.
				    isLoggedIn = userIdentity.isLoggedIn(); // Check if the user is logged in.
					$scope.isUserAuthenticated = isLoggedIn;

					if (isLoggedIn) {
						userIdentity.getCurrentUser()
							.then(function(currentUserResult) {
								$scope.currentUser = currentUserResult;
							});
					}
				});

				$scope.peopleSearch = function peopleSearch() {
					if ($scope.search.userSearchQuery) {
						searchQuery.setUserSearchQuery($scope.search.userSearchQuery);
						$scope.search.userSearchQuery = undefined;
					}
				}

				$scope.logout = function logout() {
					userAuthentication.logout()
						.then(function() {
							userIdentity.deleteCurrentUser();
							$location.path('/login');
						})
				}
		}]);
})();