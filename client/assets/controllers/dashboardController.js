app.controller('dashboardController', ['$scope', 'UsersFactory', '$location', '$cookies', function($scope, UsersFactory, $location, $cookies){
	$scope.user = $cookies.getObject('user');
	$scope.topics = [];
	$scope.newTopic = {}; 

	$scope.allTopics = function(){
		UsersFactory.allTopics(function(results){
			$scope.topics = results;
		})
	}
	$scope.addTopic = function(){
		$scope.newTopic._userid = $scope.user._id;
		UsersFactory.addTopic($scope.newTopic, function(results){
			$scope.newTopic = {};
			$scope.allTopics();
		})
	}
	$scope.allTopics()
}])