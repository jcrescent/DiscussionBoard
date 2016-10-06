app.factory('UsersFactory', ['$http', function($http) {

function UsersFactory(){
	this.validation = function(user, callback){
		$http.post('/users/create', user).then(function(results){
			callback(results.data);
		})
	}
	this.createMessage = function(message, callback){
		$http.post('/messages/create', message).then(function(results){
			callback(results.data);
		})
	}
	this.createComment = function(comment, callback){
		$http.post('/comments/create', comment).then(function(results){
			callback(results.data);
		})
	}
	this.getMessages = function(topic_id, callback){
		$http.get('/messages', topic_id).then(function(results){
			callback(results.data);
		})
	}
	this.addTopic = function(topic, callback){
		$http.post('/topics/create', topic).then(function(results){
			callback(results.data);
		})
	}
	this.allTopics = function(callback){
		$http.get('/topics').then(function(results){
			callback(results.data);
		})
	}	
	this.getUser = function(id, callback){
		$http.get(`/users/${id}`, id).then(function(results){
			callback(results.data);
		})
	}
	this.getTopic = function(id, callback){
		$http.get(`/topics/${id}`).then(function(results){
			callback(results.data);
		})
	}	
}
  return new UsersFactory();	
}]);
