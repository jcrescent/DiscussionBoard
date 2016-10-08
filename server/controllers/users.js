var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Messages = mongoose.model('Messages');
var Comments = mongoose.model('Comments');
var Topics = mongoose.model('Topics');

function UsersController(){

	this.create = function(req,res){
		Users.findOne({username: req.body.username}, function(err, user){
			if(user === null){
				var new_user = new Users(
                    {
                        name: req.body.name,
                        last: req.body.last,
                        email: req.body.email,
                        username: req.body.username,
                        description: req.body.description,
                        password: req.body.password
                    })
    			new_user.save(function(err, registered){
    				if(err){
    					res.json(err);
    				}else{
    					res.json(registered);
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
}
module.exports = new UsersController();