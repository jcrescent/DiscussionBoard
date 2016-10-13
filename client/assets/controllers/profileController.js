app.controller('profileController', ['$scope', 'UsersFactory', '$location', '$cookies','$routeParams', function($scope, UsersFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getObject('user');
	$scope.profile;
	$scope.show_message_tip = false;
	$scope.show_topic_tip = false;
	
	$scope.show_topics = false;
	$scope.showTopics = function(){
		$scope.show_topics = !($scope.show_topics);
		if ($scope.show_messages == true){
			$scope.show_messages = false;
		}
	}

	$scope.show_messages = false;
	$scope.showMessages = function(){
		$scope.show_messages = !($scope.show_messages);
		if ($scope.show_topics == true){
			$scope.show_topics = false;
		}
	}

	$scope.getProfile = function(){
		UsersFactory.getUser($routeParams.id, function(results){
			$scope.profile = results;
		})
	}
	$scope.goToTopic = function(id){
		$location.url(`topic/${id}`)
	}
	$scope.goToUser = function(id){
		$location.url(`user/${id}`)
	}
	$scope.getProfile();
}]);