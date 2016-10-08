app.controller('dashboardController', ['$scope', 'UsersFactory', '$location', '$cookies','$timeout', '$mdSidenav', '$log', function($scope, UsersFactory, $location, $cookies,$timeout, $mdSidenav, $log){
	var all = {name: "All", description: "All topics from all Dojos"}
	$scope.user = $cookies.getObject('user');
	$scope.topics = [];
	$scope.newTopic = {};
	$scope.category = all;
	$scope.categories = [];
	$scope.selected;
 
    $scope.allCategories = function(){
    	UsersFactory.allCategories(function(results){
    		$scope.categories = results;
    	});
    }
	$scope.allTopics = function(){
		UsersFactory.allTopics(function(results){
			$scope.topics = results;
		});
	}
	$scope.createTopic = function(){
		$scope.newTopic._userid = $scope.user._id;
		UsersFactory.addTopic($scope.newTopic, function(results){
			$scope.newTopic = {};
			$scope.allTopics();
		});
	}
	$scope.selectCategory = function(category){
		$scope.category = category;
	}
	$scope.allCategories();
	$scope.allTopics();
}])