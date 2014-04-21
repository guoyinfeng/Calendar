// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items, time) {

  $scope.items = items;
  $scope.date = time;
  console.log('time::'+time);
  $scope.selected = {
    item: $scope.items[0]
  };
    $scope.event = {
        subject: ''
    };
  $scope.ok = function () {
    $modalInstance.close($scope.event);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};