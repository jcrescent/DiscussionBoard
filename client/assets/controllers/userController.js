app.controller('userController', ['$scope', 'UsersFactory', '$location', '$cookies', '$routeParams', function($scope, UsersFactory, $location, $cookies, $routeParams){
	$scope.user = $cookies.getOject('user');
	$scope.viewser; 

	$scope.getUser = function(){
		UsersFactory.getUser($routeParams.id, function(results){
			$scope.viewser = results;
		})
	}
}]);