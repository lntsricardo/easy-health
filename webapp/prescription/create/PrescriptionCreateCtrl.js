(function() {

  'use strict';

  angular.module('easy-health').controller('PrescriptionCreateCtrl', PrescriptionCreateCtrl);

  PrescriptionCreateCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', '$window', 'Upload'];

  function PrescriptionCreateCtrl($scope, $http, $state, $stateParams, $window, Upload) {

    var init = function() {

    };

    $scope.data = {

    };

    init();

  }

})();
