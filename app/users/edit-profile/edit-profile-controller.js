(function() {
	'use strict';

	angular.module('triplanner.users.editProfile', [
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

			$routeProvider.when('/edit-profile', {
				templateUrl: 'users/edit-profile/edit-profile.html',
				controller: 'EditProfileCtrl',
				resolve: routeChecks.authenticated
			})
		}])

		.controller('EditProfileCtrl', [
			'$scope',
			'$location',
			'pageTitle',
			'notification',
			'userIdentity',
			'users',
			function($scope, $location, pageTitle, notification, userIdentity, users) {
				pageTitle.setTitle('Edit Profile');

				var currentUser;

				if (userIdentity.isLoggedIn()) {
					userIdentity.getCurrentUser()
						.then(function(currentUserResult) {
							currentUser = currentUserResult;
							$scope.user = currentUser;
						})
				}

				$scope.save = function save() {
					var updatedUser = angular.copy($scope.user);
					var sexCleared = false;

					if (updatedUser.sex == 'None') { // If the user removes their 'sex' from their profile information.
						updatedUser.sex = undefined;
						sexCleared = true;
					}

					if (updatedUser.age == '') {
						updatedUser.age = undefined;
					}

					users.updateUser(currentUser._id, updatedUser)
						.then(function(updatedUserResult) {
							notification.success('You have successfully updated your profile information, ' + updatedUserResult.username + '!');
							
							if (sexCleared) {
								$scope.user.sex = undefined; // Updates the view manually because updatedUser is a deep copy and won't update the view.
							}

							$location.path('/profile/' + currentUser._id);
						})
				}

				$scope.cancel = function cancel() {
					$location.path('/profile/' + currentUser._id);
				}
		}])
})();