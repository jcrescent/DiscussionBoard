app.controller('loginController',['$scope', "UsersFactory", "$location",'$cookies', function($scope, UsersFactory, $location, $cookies){
	$scope.error;
	$scope.login= function(){
		UsersFactory.validation($scope.user, function(user){
			if(user === null){
				$scope.error = "Name already exists" 
			}else{
				$cookies.putObject('user', user);
				$location.url('/dashboard');
			}
		})
	}
}])