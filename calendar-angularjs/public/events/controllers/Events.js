/**
 * calendarDemoApp - 0.8.0
 */
angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap']);

function CalendarCtrl($scope, $modal, eventStorage) {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	/* event source that contains custom events on the scope */
	/*
	$scope.events = [{
		title: 'All Day Event',
		start: new Date(y, m, 1)
	}, {
		title: 'Click for Google',
		start: new Date(y, m, 22),
		end: new Date(y, m, 23),
		url: 'http://google.com/'
	}];
	*/
	//var eventslocal = 
	$scope.events = eventStorage.get();
	/*
	$scope.$watch('eventslocal', function (newValue, oldValue) {
		console.log('abc!!!');
		if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
			var events2Upsert = [];
			for(var i = 0; i < newValue.length; i++){
			//for(event in $scope.events){
				console.log('event:::'+newValue[i].title);
				events2Upsert.push({
					title: newValue[i].title,
					start: newValue[i].start,
					end: newValue[i].end,
					className: newValue[i].className
				});
			}
			eventStorage.put(events2Upsert);
		}
	}, true);
	*/

	/* alert on eventClick */
	$scope.alertOnEventClick = function (event, allDay, jsEvent, view) {
		console.log('event click');
		$scope.alertMessage = (event.title + ' was clicked ');
	}; 

	/* alert on Drop */
	$scope.alertOnDrop = function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
		$scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
	}; 

	/* alert on Resize */
	$scope.alertOnResize = function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
		$scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
	}; 

	/* add and removes an event source of choice */
	$scope.addRemoveEventSource = function (sources, source) {
		var canAdd = 0;
		angular.forEach(sources, function (value, key) {
			if (sources[key] === source) {
				sources.splice(key, 1);
				canAdd = 1;
			}
		});
		if (canAdd === 0) {
			sources.push(source);
		}
	}; 

	/* add custom event*/
	$scope.addEvent = function () {
		$scope.events.push({
			title: 'Open Sesame',
			start: new Date(y, m, 28),
			end: new Date(y, m, 29),
			className: ['openSesame']
		});
	}; 

	/* remove event */
	$scope.remove = function (index) {
		$scope.events.splice(index, 1);
	}; 

	/* Change View */
	$scope.changeView = function (view, calendar) {
		calendar.fullCalendar('changeView', view);
	}; 

	/* Change View */
	$scope.renderCalender = function (calendar) {
		calendar.fullCalendar('render');
	};

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.alertEventOnDayClick = function (date, allDay, jsEvent, view) {
		console.log('day click');
		var dEvent = date.getDate();
		var mEvent = date.getMonth();
		var yEvent = date.getFullYear();


		var modalInstance = $modal.open({
			templateUrl: 'newEvent.html',
			controller: ModalInstanceCtrl,
			resolve: {
				items: function () {
					return $scope.items;
				},
				time: function(){
					return date;
				}
			}
		});

		modalInstance.result.then(function (eventobj) {
			var event2Add = {
				title: eventobj.subject,
				start: new Date(yEvent, mEvent, dEvent),
				end: new Date(yEvent, mEvent, dEvent),
				className: ['openSesame']
			};
			$scope.events.push(event2Add);
			var events2Upsert = [];
			for(var i = 0; i < $scope.events.length; i++){
				console.log('event:::'+$scope.events[i].title);
				events2Upsert.push({
					title: $scope.events[i].title,
					start: $scope.events[i].start,
					end: $scope.events[i].end,
					className: $scope.events[i].className
				});
			}
			eventStorage.put(events2Upsert);
			console.log('approve');

		}, function () {
			console.log('Modal dismissed at: ' + new Date());
		});
	};

	/* config object */
	$scope.uiConfig = {
		calendar: {
			//height: 450,
			editable: true,
			header: {
				left: 'title',
				center: '',
				right: 'today prev,next'
			},
			dayClick: $scope.alertEventOnDayClick,
			eventClick: $scope.alertOnEventClick,
			eventDrop: $scope.alertOnDrop,
			eventResize: $scope.alertOnResize
		}
	};

	/* event sources array*/
	$scope.eventSources = [$scope.events];
} 
/* EOF */