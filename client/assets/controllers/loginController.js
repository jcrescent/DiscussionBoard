app.controller('loginController',['$scope', "UsersFactory", "$location", '$cookies', function($scope, UsersFactory, $location, $cookies){
	$scope.error;
	$scope.newUser = {};
	$scope.pass_confirm;
	$scope.dup_error;

	$scope.validate = function(){
		if ($scope.newUser.confirm !== $scope.newUser.password){
				$scope.pass_confirm = "Confirmation must match password"
				return
			}
		UsersFactory.createUser($scope.newUser, function(results){
			if (results.errmsg){
				console.log(errmsg);
				$scope.dup_error = "Email address already exists";
			}
			else if (results.errors == null){
				$rootScope.user = {_id: results._id, name: results.name, description: results.description}
				$cookies.putObject('user', {_id: results._id, name: results.name, description: results.description});
				$location.url('/dashboard')
			}
			console.log(results.errors)
			$scope.errors = results.errors
		})
	}
}]);
