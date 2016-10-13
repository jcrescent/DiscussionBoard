app.controller('topicController', ['$scope', 'UsersFactory', '$location', '$cookies','$routeParams', function($scope, UsersFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getObject('user');
	$scope.topic;
	$scope.likes;
	$scope.newCommentPost={};
	$scope.newMessagePost={};

	$scope.message_field =false;
	$scope.showMessageInput = function(){
		$scope.message_field=!($scope.message_field)
	}
	$scope.getTopic = function(){
		UsersFactory.getTopic($routeParams.id, function(results){
			console.log(results);
			$scope.topic = results;
		})
	}
	$scope.createMessage = function(){
		$scope.newMessage._topic = $scope.topic._id;
		$scope.newMessage._user = $scope.user._id;
		UsersFactory.createMessage($scope.newMessage, function(results){
			$scope.newMessage = {};
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
	$scope.goToUser = function(id){
		$location.url(`user/${id}`);
	}

	$scope.createLike =function(){
		UsersFactory.createLike($scope.topic._id, function(results){
			$scope.getLikes($scope.user._id);
		})
	}
	
	$scope.getLikes = function(){
		UsersFactory.getLikes($scope.user._id, function(results){
			$scope.likes = results;
		})
	}

	$scope.getLikes();
	$scope.getTopic();
	$scope.getMessages();
}])
	