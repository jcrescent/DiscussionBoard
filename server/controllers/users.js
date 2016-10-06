var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');

function UsersController(){

	this.create = function(req,res){
		Users.findOne({name: req.body.name}, function(err, user){
			if(user === null){
				var new_user = new Users({name: req.body.name})
    			new_user.save(function(err){
    				if(err){
    					console.log('could not add new user')
    					res.json(err);
    				}else{
    					console.log('added');
    					res.json(new_user);
    				}
    			})
			}else{
				res.json(user);
			}
		})
    }
    this.show = function(req, res){
    	Users.findOne({_id: req.body.id})
        .populate({
            path: '_messages', 
                populate:[{
                    path: "_comments",
                        populate:[{
                            path:"_user"
                        }] 
                    }]
                })
        .exec(function(err, user){
            if(err){
                res.json(err);
            }else{
                res.json(user);
            }
        })
	}
    // this.update = function(req, res){
    // 	Users.findOne({_id: req.body.id}, function(err, user){

    // 	})
    // }
}
module.exports = new UsersController();