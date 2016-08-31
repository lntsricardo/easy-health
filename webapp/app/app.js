(function () {

	'use strict';

	var app = angular.module('EasyHealth', ['ui.router', 'ngAnimate', 'ngMessages', 'ngResource', 'ngAria', 'ngMaterial', 'ngFileUpload', 'monospaced.elastic', 'easy-health.template']);

	app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('prescription-create', {
			url: '/prescription/:id',
			templateUrl: 'webapp/prescription/_create_prescription.html',
			controller: 'PrescriptionCreateCtrl'
		})
		.state('prescription', {
			url: '/',
			templateUrl: 'webapp/prescription/list/_list_prescription.html',
			controller: 'PrescriptionListCtrl'
		});

	}]);

})();
