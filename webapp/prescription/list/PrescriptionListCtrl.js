(function () {

  'use strict';

  angular.module('EasyHealth').controller('PrescriptionListCtrl', PrescriptionListCtrl);

  PrescriptionListCtrl.$inject = ['$scope', '$http', '$window', '$state'];

  function PrescriptionListCtrl($scope, $http, $window, $state) {

    var init = function () {
      loadList();
    };

    $scope.filterPrescription = '';

    $scope.data = {
      orders: [],
      edit: function(idPrescription) {
        $state.go('prescription-create', {'id':idPrescription});
      }
    };

    var loadList = function () {
      $http.get('/easy-health/prescription/list').then(function (result) {
        $scope.data.prescriptions = result.data;
      }, function (error) {
        console.error(error);
      });
    };

    init();
  }
})();
