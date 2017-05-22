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

					if (updatedUser.sex == 'None') { // If the user removes their 'sex' from their profile information.
						updatedUser.sex = undefined;
					}

					if (updatedUser.age == '') { // If the user removes their 'age', don't send an empty string to the server.
						updatedUser.age = undefined;
					}

					users.updateUser(currentUser._id, updatedUser)
						.then(function(updatedUserResult) {
							notification.success('You have successfully updated your profile information, ' + updatedUserResult.username + '!');
							
							userIdentity.deleteCurrentUser(); // Clears the cached current user that has old profile info.
							$location.path('/profile/' + currentUser._id);
						})
				}

				$scope.cancel = function cancel() {
					userIdentity.deleteCurrentUser(); // Clears the cached current user that has new profile info.
					$location.path('/profile/' + currentUser._id);
				}
		}])
})();