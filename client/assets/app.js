
var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngCookies', 'ngAnimate']);
app.config(function ($routeProvider,$mdThemingProvider) {
$routeProvider
	.when('/main', {
		templateUrl: "partials/main.html",
		controller: "mainController"
	})
	.when('/dashboard', {
		templateUrl: "partials/dashboard.html",
		controller: "dashboardController"
	})
	.when('/user/:id', {
		templateUrl: "partials/user.html",
		controller: "profileController"
	})
	.when('edit/user/:id', {
		templateUrl: 'partials/edit.html',
		controller: 'userController'
	})
	.when('/topic/:id', {
		templateUrl: 'partials/topic.html',
		controller: 'topicController'
	})
	.when('/', {
		templateUrl: "partials/login.html",
		controller: "userController"
	})
	.otherwise({
		redirectTo: '/'
	})
});
app.directive('slideDown', ['$animate',
    function ($animate) {
        return {
            link: function (scope, elem, attrs) {
                elem.on('click', function () {
                    var target = getElementById('form');
                    $animate.addClass(target, 'reveal', function () {
                        self.removeClass('reveal');
                    });
                });
            }
        };
    }]);