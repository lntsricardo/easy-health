(function () {

	'use strict';

	var app = angular.module('EasyOrder', ['ui.router', 'ngAnimate', 'ngMessages', 'ngResource', 'ngAria', 'ngMaterial', 'ngFileUpload', 'monospaced.elastic', 'easy-order.template']);

	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('order-create', {
			url: '/order/:id',
			templateUrl: 'webapp/order/_create_order.html',
			controller: 'OrderCreateCtrl'
		})
		.state('order', {
			url: '/',
			templateUrl: 'webapp/order/list/_list_order.html',
			controller: 'OrderListCtrl'
		});

	}]);

})();

(function() {

  'use strict';

  angular.module('Wayco').controller('OrderCreateCtrl', OrderCreateCtrl);

  OrderCreateCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', '$window', 'Upload'];

  function OrderCreateCtrl($scope, $http, $state, $stateParams, $window, Upload) {

    var init = function() {

    };

    $scope.data = {

    };

    init();

  }

})();

(function () {

  'use strict';

  angular.module('EasyOrder').controller('OrderListCtrl', OrderListCtrl);

  OrderListCtrl.$inject = ['$scope', '$http', '$window', '$state'];

  function OrderListCtrl($scope, $http, $window, $state) {

    var init = function () {
      loadList();
    };

    $scope.filterOrder = '';

    $scope.data = {
      orders: [],
      edit: function(idTheme) {
        $state.go('order-create', {'id':idOrder});
      }
    };

    var loadList = function () {
      $http.get('/easy-order/order/list').then(function (result) {
        $scope.data.orders = result.data;
      }, function (error) {
        console.error(error);
      });
    };

    init();
  }
})();
