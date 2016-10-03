app.controller('topicController', ['$scope', 'UsersFactory', '$location', '$cookies','$routeParams' function($scope, UsersFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getOject('user');
	$scope.topic;

	$scope.getTopic = function(){
		UsersFactory.getTopic(function(routeParams.id, results){
			$scope.topic = results;
		})
	}
}]);