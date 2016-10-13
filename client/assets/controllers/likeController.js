app.controller('likeController', ['$scope', 'UsersFactory', '$location', '$cookies','$routeParams', function($scope, UsersFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getObject('user');
	$scope.liked = 

	$scope.createLike = function(topic_id){
		UsersFactory.createLike($scope.user._id, topic_id, function(results){
			$scope.getLikes($scope.user._id);
		})
	}
	$scope.destroy = function(topic_id){
		UsersFactory.destroyLike($scope.user._id, topic_id, function(results){
			$scope.
		})
	}
}]);