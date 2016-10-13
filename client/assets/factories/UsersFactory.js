app.factory('UsersFactory', ['$http', function($http) {


function UsersFactory(){
	var	_this = this
	_this.user = {};
	this.createUser = function(user, callback){
		$http.post('/users/create', user).then(function(results){
			_this.user._id = results.data._id
			_this.user.username = results.data.username
			_this.user.description = results.data.description
			callback(_this.user);
		})
	}
	this.getLoggedInUser = function(callback){
		callback(_this.user);
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
	this.createTopic = function(topic, callback){
		$http.post('/topics/create', topic).then(function(results){
			callback(results.data);
		})
	}
	this.allTopics = function(callback){
		$http.get('/topics').then(function(results){
			callback(results.data);
		})
	}
	this.destroyTopic = function(id, callback){
		$http.post(`/topics/destroy/${id}`).then(function(results){
			callback(results.data);
		})
	}	
	this.getUser = function(id, callback){
		$http.get(`/users/${id}`).then(function(results){
			callback(results.data);
		})
	}
	this.getTopic = function(id, callback){
		$http.get(`/topics/${id}`).then(function(results){
			callback(results.data);
		})
	}
	this.getCategory = function(id, callback){
		$http.get(`/category/${id}`).then(function(results){
			callback(results.data);
		})
	}
	this.allCategories = function(callback){
		$http.get('/categories').then(function(results){
			callback(results.data);
		})
	}	
	this.createLike = function(user_id, topic_id, callback){
		$http.post('/likes/create', {user: user_id, topic: topic_id}).then(function(results){
			callback(results.data);
		})
	}
	this.getLikes = function(user_id, callback){
		$http.get(`/likes/get/${user_id}`).then(function(results){
			callback(results.data);
		})
	}
	this.destroyLike = function(user_id, topic_id, callback){
		$http.post('/likes/destroy', {user: user_id, topic: topic_id}).then(function(results){
			callback(results.data);
		})		
	}
}
  return new UsersFactory();	
}]);
