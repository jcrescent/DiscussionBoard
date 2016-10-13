app.controller('dashboardController', ['$scope', 'UsersFactory', '$location', '$cookies','$timeout', '$mdSidenav', '$log', function($scope, UsersFactory, $location, $cookies,$timeout, $mdSidenav, $log){
	$scope.all = {name: "All", description: "All topics from all Dojos"}
	$scope.user = $cookies.getObject('user');
	$scope.topics = [];
	$scope.newTopic = {};
	$scope.category = $scope.all;
	$scope.categories = [];
	$scope.likes=[];

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
	$scope.destroyTopic = function(id){
		UsersFactory.destroyTopic(id, function(results){
			$scope.allTopics();
		})
	}
	$scope.createLike = function(topic_id){
		UsersFactory.createLike($scope.user._id, topic_id, function(results){
			$scope.getLikes($scope.user._id);
			$scope.allTopics();
		})
	}
	$scope.destroyLike = function(topic_id){
		UsersFactory.destroyLike($scope.user._id, topic_id, function(results){
			$scope.getLikes($scope.user._id);
			$scope.allTopics();
		})
	}
	$scope.getLikes = function(){
		$scope.likes = [];
		UsersFactory.getLikes($scope.user._id, function(results){
			console.log(results);
			for (var i = 0; i<results.length; i++){
				$scope.likes.push(results[i]._topic)
				console.log($scope.likes)
			};
		})
	}
	// $scope.userlikes = function(){
	// 	for(var i = 0; i<$scope.topics.length; i++){
	// 		$scope.likesArr.push($scope.topics[i]._likes._user)
	// 	}
	// }
	$scope.allCategories();
	$scope.allTopics();
	$scope.getLikes($scope.user._id);
}]);
