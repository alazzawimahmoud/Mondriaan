var colorMeApp = angular.module('colorMeApp', ['ngRoute']);

colorMeApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        controller: 'MondriaanController',
        templateUrl: 'mondriaanView.html'
    })
    .otherwise({ redirectTo: '/' });
})