// A service responsible for transmitting data about search queries. 

(function() {
	'use strict';

	angular.module('triplanner.common.searchQuery', [])

		.factory('searchQuery', [
			function() {
				function setUserSearchQuery(searchQuery) {
					this.searchQuery = searchQuery;
				}

				function getUserSearchQuery() {
					return this.searchQuery;
				}

				return {
					setUserSearchQuery: setUserSearchQuery,
					getUserSearchQuery: getUserSearchQuery
				}
		}])
})();