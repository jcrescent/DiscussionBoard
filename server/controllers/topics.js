var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');
var Categories = mongoose.model('Categories');

function TopicsController(){
	this.index = function(req, res){
		Topics.find({})
		.populate('_user')
		.populate('_category')
		.exec(function(err, topics){
			if(err){
				res.json(err);
			}else{
				console.log(topics);
				res.json(topics);
			}
		})
	}
	this.create = function(req, res){
		Users.findOne({_id: req.body._userid}, function(err, user){
			var new_topic = new Topics({name: req.body.name, description: req.body.description});
			new_topic._user = req.body._userid;
			new_topic.save(function(err){
				user._topics.push(new_topic._id);
				user.save(function(err){
					Categories.findOne({_id: req.body._categoryid}, function(err, category){
						new_topic._category = req.body._categoryid;
						new_topic.save(function(err){			
							category._topics.push(new_topic._id);
							category.save(function(err){
								if(err){
									res.json(err)	
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
	this.show = function(req, res){
		Topics.findOne({_id: req.params.id})
		.populate(
			{path: '_messages', populate:
				[{path: "_user"},{path: "_comments", populate:{path: "_user"}}]
		})
		.populate("_user")
		.populate("_category")
		.exec(function(err, topic){
			if(err){
				res.json(err);
			}else{
				res.json(topic)
			}
		})
	}
}

module.exports = new TopicsController();