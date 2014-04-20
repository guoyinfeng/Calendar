/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
*/
angular.module('calendarDemoApp').factory('eventStorage', function () {
	var STORAGE_ID = 'event-storage';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (events) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(events));
		}
	};
});
