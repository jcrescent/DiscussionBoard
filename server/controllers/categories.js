var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');
var Categories = mongoose.model('Categories');

function CategoriesController(){
	this.index = function(req, res){
		Categories.find({}, function(err, categories){
			if(err){
				res.json(err);
			}else{
				res.json(categories);
			}
		})
	}
	this.show = function(req, res){
		Categories.findOne({_id: req.params.id})
			.populate({
			path:'_topics', 
				populate: 
					{path: "_user"}
				})
		.exec(function(err, category){
			if(err){
				res.json(err);
			}else{
				res.json(category);
			}
		})
	}		
}
module.exports = new CategoriesController();