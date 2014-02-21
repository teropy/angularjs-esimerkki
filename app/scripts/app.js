var $ = require('jquery');
var angular = require('angular');
var angularRoute = require('angular-route');

var esimerkkiApp = angular.module('esimerkkiApp', [
  'ngRoute',
  'esimerkkiModule']);

esimerkkiApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).
    when('/hello', {
      templateUrl: 'views/hello.html',
      controller: 'HelloCtrl'
    }).
    when('/calculator', {
      templateUrl: 'views/calculator.html',
      controller: 'CalculatorCtrl'
    }).
    otherwise({
      redirectTo: '/main'
    });
}]);

var esimerkkiModule = angular.module('esimerkkiModule', []);

esimerkkiModule.controller('MainCtrl', require('./controllers/mainController.js'));
esimerkkiModule.controller('HelloCtrl', require('./controllers/helloController.js'));
esimerkkiModule.controller('CalculatorCtrl', require('./controllers/calculatorController.js'));

esimerkkiModule.directive('testiDirektiivi', require('./directives/testiDirektiivi.js'));
