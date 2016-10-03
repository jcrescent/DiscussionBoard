app.controller('dashboardController', ['$scope', 'UsersFactory', '$location', '$cookies', function($scope, UsersFactory, $location, $cookies){
	$scope.user = $cookies.getOject('user');
	$scope.topics = [];
	$scope.allTopics = function(){
		UsersFactory.allTopics(function(results){
			$scope.topics = results;
		})
	}
	$scope.addTopic = function(){
		$scope.newTopic._userid = $scope.user._id;
		UsersFactory.createTopic($scope.newTopic, function(){

		})
	}
}