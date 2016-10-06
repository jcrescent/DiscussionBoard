var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');

function MessagesController(){
	this.index = function(req, res){
		Messages.find({_topic: req.body.topic_id})
		.populate({
			path:'_comments', 
				populate:
					{path: "_user"}		
		})
		.populate('_user')
		.exec(function(err, messages){
			if(err){
				console.log('get users failed');
			} else{
				res.json(messages);
			}	
		})
	}
	this.create = function(req, res){
	 	Users.findOne({_id: req.body._user}, function(err, user){
			var new_message = new Messages({text: req.body.text});
			new_message._user = req.body._user;
			new_message._topic = req.body._topic; 
			new_message.save(function(err){
				user._messages.push(new_message);
				user.save(function(err){
					Topics.findOne({_id: req.body._topic}, function(err, topic){
						topic._messages.push(new_message);
						topic.save(function(err){
							if(err){
								res.json(err);
							}else{
								res.json(new_message);
							}	
						})
					})
				})	
			})
		})
	}	
}
module.exports = new MessagesController();