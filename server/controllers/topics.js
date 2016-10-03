var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');

function TopicsController(){
	this.index = function(req, res){
		Topics.find({});
		.populate('_user')
		.exec(function(err, topics){
			if(err){

			}else{
				res.json(topics);
			}
		})
	}
	this.create = function(req, res){
		User.findOne({_id: req.body._userid}, function(err, user){
			var new_topic = new Topics({name: req.body.name};
			new_topic._user = req.body._userid;
			new_topic.save(function(err){
				user._topics.push(new_topic._id);
				user.save(function(err){
					res.send();
				})
			})
		})
	}
	this.show = function(req, res){
		Topic.findOne({_id: req.body.id}, function(err, topic){
			if(err){
				res.json(err);
			}else{
				res.json(topic);
			}
		})
	}
}

module.exports = new TopicsController();