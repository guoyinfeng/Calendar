// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items, eventTemp) {

  $scope.items = items;
  $scope.event = eventTemp;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.event);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};