app.controller('userController', ['$scope', 'UsersFactory', '$location', '$cookies', '$routeParams','$timeout', '$mdSidenav', '$log', function($scope, UsersFactory, $location, $cookies, $routeParams,$timeout, $mdSidenav, $log){
	$scope.user;
	UsersFactory.getLoggedInUser(function(user){
		$scope.user = user
	})
	$scope.viewser;
	$scope.error;
	$scope.newUser = {};
	$scope.match = { username:"jcrescent", password:"Thunder7!"}
	$scope.pass_confirm;
	$scope.dup_error;
	$scope.toggleRight = buildToggler('right');
    
    // sidenav______________________________________________________________________

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
  	}
	function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    // function buildDelayedToggler(navID) {
    //   return debounce(function() {
    //     $mdSidenav(navID)
    //       .toggle()
    //       .then(function () {
    //         $log.debug("toggle " + navID + " is done");
    //       });
    //   }, 200);
    // }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    } 
   	$scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    }
    // login/logout______________________________________________________________________

	$scope.login = function(){
		UsersFactory.createUser($scope.match, function(results){
			if(results === null){
				$scope.error = "Invalid email or password"
				$scope.match = {};
			}else{
				$scope.user = results
				$cookies.putObject('user', {_id: results._id, name: results.name, description: results.description});
				$location.url('/dashboard')
			}
		})
	}
	$scope.logout = function(){
		$cookies.remove('user');
		$location.url('/');
	}
	$scope.validate = function(){
		if ($scope.newUser.confirm !== $scope.newUser.password){
				$scope.pass_confirm = "Confirmation must match password"
				return
			}
		UsersFactory.createUser($scope.newUser, function(results){
			if (results.errmsg){
				$scope.dup_error = "Email address already exists";
			}
			else if (results.errors == null){
				user = {_id: results._id, name: results.name, description: results.description}
				$cookies.putObject('user', {_id: results._id, name: results.name, description: results.description});
				$scope.user = $cookies.getObject('user');
				$scope.newUser={};
				$location.url('/dashboard')
			}
			$scope.errors = results.errors
		})
	}
}]);