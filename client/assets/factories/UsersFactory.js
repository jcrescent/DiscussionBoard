app.factory('UsersFactory', ['$http', function($http) {

function UsersFactory(){
	this.validation = function(user, callback){
		$http.post('/users/create', user).then(function(results){
			callback(results.data);
		})
	}
	this.createMessage = function(message, callback){
		$http.post('/add_message', message).then(function(results){
			callback(results.data);
		})
	}
	this.createComment = function(comment, callback){
		$http.post('/comments/create', comment).then(function(results){
			callback(results.data);
		})
	}
	this.allMessages = function(callback){
		$http.get('/messages').then(function(results){
			callback(results.data);
		})
	}
	this.createTopic = function(topic, callback){
		$http.post('/add_topic', topic).then(function(results){
			callback(results.data);
		})
	}
	this.allTopics = function(callback){
		$http.get('/topics').then(function(results){
			callback(results.data);
		})
	}	
	this.getUser = function(user, callback){
		$http.get('/user/', user).then(function(results){
			callback(results.data);
		})
	}
	this.getTopic = function(id, callback){
		$http.get(`/topics/${id}`).then(function(results){
			calback(results.data);
		})
	}	
}
  return new UsersFactory();	
}]);
