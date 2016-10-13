var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');
var Categories = mongoose.model('Categories');
var Likes = mongoose.model('Likes');

function LikesController(){
	this.create = function(req, res){
		console.log(req.body)
		Users.findOne({_id:req.body.user}, function(err, user){
			var new_like = new Likes({})
			new_like._user = req.body.user;
			new_like.save(function(err){
				user._likes.push(new_like);
				user.save(function(err){
					Topics.findOne({_id:req.body.topic}, function(err, topic){
						new_like._topic = req.body.topic;
						new_like.save(function(err){
							topic._likes.push(new_like);
							topic.save(function(err){
								if(err){
									res.json(err);
								}else{
									res.send();
								}
							})
						})
					})
				})
			})
		})
	}
	this.index = function(req, res){
		Likes.find({_user: req.params.id}, function(err, likes){
			if(err){
				res.json(err);
			}else{
				res.json(likes);
			}
		})
	}
	this.delete = function(req, res){
		Likes.remove({_user: req.body.user, _topic:req.body.topic}, function(err){
			if(err){
				res.json(err);
			}else{
				res.send();
			}
		})
	}
}
module.exports = new LikesController();