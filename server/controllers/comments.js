var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');

function CommentsController(){
	this.create = function(req, res){
		Messages.findOne({_id: req.body._message}, function(err, message){
			var new_comment = new Comments({text: req.body.text})
			new_comment._message = message._id;
			new_comment.save(function(err){
				message._comments.push(new_comment);
				message.save(function(err){
					Users.findOne({_id: req.body._user}, function(err, user){
						new_comment._user = user._id;
						new_comment.save(function(err){
							user._comments.push(new_comment);
							user.save(function(err){
								res.send();
							})
						})
					})
				})
			})
		})
	}
}
module.exports = new CommentsController();