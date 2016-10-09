app.controller('dashboardController', ['$scope', 'UsersFactory', '$location', '$cookies','$timeout', '$mdSidenav', '$log', function($scope, UsersFactory, $location, $cookies,$timeout, $mdSidenav, $log){
	$scope.all = {name: "All", description: "All topics from all Dojos"}
	$scope.user = $cookies.getObject('user');
	$scope.topics = [];
	$scope.newTopic = {};
	$scope.category = $scope.all;
	$scope.categories = [];

	$scope.selected = $scope.all;
	$scope.selectCategory = function(category){
		$scope.category = category
		$scope.selected = category;
	}

	$scope.topic_field = false;
	$scope.show_topic_input = function(){
		$scope.topic_field = !($scope.topic_field);
	}

	$scope.showall = function(){
		$scope.category = $scope.all;
		$scope.selected = $scope.all;

	}
 	$scope.goToTopic = function(topic_id){
 		$location.url(`/topic/${topic_id}`)
 	}
    $scope.allCategories = function(){
    	UsersFactory.allCategories(function(results){
    		$scope.categories = results;
    	});
    }
	$scope.allTopics = function(){
		UsersFactory.allTopics(function(results){
			console.log(results)
			$scope.topics = results;
		});
	}
	$scope.createTopic = function(){
		$scope.newTopic._userid = $scope.user._id;
		$scope.newTopic._categoryid = $scope.category._id;
		UsersFactory.createTopic($scope.newTopic, function(results){
			$scope.newTopic = {};
			$scope.allTopics();
			$scope.topic_field = !($scope.topic_field);
		});
	}
	$scope.allCategories();
	$scope.allTopics();
}])