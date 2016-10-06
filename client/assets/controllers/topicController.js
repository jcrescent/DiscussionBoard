app.controller('topicController', ['$scope', 'UsersFactory', '$location', '$cookies','$routeParams', function($scope, UsersFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getObject('user');
	$scope.topic;
	$scope.newCommentPost={};
	$scope.newMessagePost={};

	$scope.getTopic = function(){
		UsersFactory.getTopic($routeParams.id, function(results){
			console.log(results);
			$scope.topic = results;
		})
	}
	$scope.newMessage = function(){
		$scope.newMessagePost._topic = $scope.topic._id;
		$scope.newMessagePost._user = $scope.user._id;
		UsersFactory.createMessage($scope.newMessagePost, function(results){
			$scope.newMessagePost = {};
			$scope.getTopic();
		})
	}
	$scope.newComment = function(message){
		$scope.newCommentPost._user = $scope.user._id;
		$scope.newCommentPost._message = message._id
		UsersFactory.createComment($scope.newCommentPost, function(){
			$scope.newCommentPost = {};
			$scope.getTopic();
		})
	}
	$scope.getMessages = function(){
		UsersFactory.getMessages($routeParams.id, function(results){
			$scope.messages = results;
		})
	}
	$scope.getTopic();
}])
	