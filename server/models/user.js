var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		maxlength: [30,"Username should be less than 30 characters"], 
		minlength: [2, "Username must be at least two characters"], 
		required: [true, "Username is required"],
		validate: [{
			validator: function(string){
				return /[A-Za-z]/.test(string)
			},
			message: "Invalid name"
			}, 
		]
	},
	last: {
		type: String,
		required:[true, "Last name required"],
		validate: [{
			validator: function(string){
				return /[A-Za-z]/.test(string)
			},
			message: "Invalid name"
			}, 
		]
	},
	username: {
		type: String
	}
	description:{
		type: String, 
		maxlength: [200, "description too long"],

	},
	password: {
		type: String, 
		required: [true, "Must enter a password"], 
		minlength: [8, "Password too short"],
		maxlength: [32, "Password too long"],
		validate: [{
			validator: function(string) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( string );
          },
          	message: "Your password must have at least 1 number, uppercase and special character"
        	}
		]
	},  
	_topics: [{type: Schema.Types.ObjectId, ref: "Topics"}],
	_messages: [{type: Schema.Types.ObjectId, ref: "Messages"}],
	_comments: [{type: Schema.Types.ObjectId, ref: "Comments"}]
	},	{timestamps: true});

var TopicSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: [true, "Must enter something"]
	},
	description: {
		type: String, 
		required: [true, "Must enter a description"]
	},
	_messages: [{type: Schema.Types.ObjectId, ref: "Messages"}],
	_user: {type: Schema.Types.ObjectId, ref: "Users"}
	}, {timestamps: true});

var MessageSchema = new mongoose.Schema({
	text: {
		type: String,
		minlength: [1, "Message has no content!"],
		required: [true, 'Must enter a message']
	},
	_comments: [{type: Schema.Types.ObjectId, ref: "Comments"}],
	_user: {type: Schema.Types.ObjectId, ref: "Users"},
	_topic: {type: Schema.Types.ObjectId, ref: "Topics"}
	}, {timestamps: true});
	
var CommentSchema = new mongoose.Schema({
	text: {type: String, required: [true, 'Must enter a comment']},
	_message: {type: Schema.Types.ObjectId, ref: "Messages"},
	_user: {type: Schema.Types.ObjectId, ref: "Users"} 
	}, {timestamps: true});	

var CategorySchema = new mongoose.Schema({
	name: {type: String},
	_topics: [{type: Schema.Types.ObjectId, ref: "Topics"}],
}, {timestamps: true});

mongoose.model('Users', UserSchema);
var Users = mongoose.model('Users')
mongoose.model('Messages', MessageSchema); 
var Messages = mongoose.model('Messages')
mongoose.model('Comments', CommentSchema); 
var Comments = mongoose.model('Comments')
mongoose.model('Topics', TopicSchema);
var Topics = mongoose.model('Topics') 
// 	email: {
// 		type: String, 
// 		unique: true,
// 		required: [true, "Email address required"], 
// 		validate: [{
// 			validator: function(string) {
// 				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string)
// 			}, 
// 			message: "Invalid Email Address"
// 			},
// 		]
// 	},
// 	first: {
// 		type: String,
// 		required:[true, "First name required"],
// 		validate: [{
// 			validator: function(string){
// 				return /[A-Za-z]/.test(string)
// 			},
// 			message: "Invalid name"
// 			}, 
// 		]
// 	},  
// 	last: {
// 		type: String,
// 		required:[true, "Last name required"],
// 		validate: [{
// 			validator: function(string){
// 				return /[A-Za-z]/.test(string)
// 			},
// 			message: "Invalid name"
// 			}, 
// 		]
// 	},
// 	password: {
// 		type: String, 
// 		required: [true, "Must enter a password"], 
// 		minlength: [8, "Password too short"],
// 		maxlength: [32, "Password too long"],
// 		validate: [{
// 			validator: function(string) {
// 				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test( string );
//           },
//           	message: "Your password must have at least 1 number, uppercase and special character"
//         	}
// 		]
// 	},  
// 	birth: {
// 		type: Date, 
// 		required: [true, "Please enter your birthday"]
// 	}
// 	},
// 	{timestamps: {
// 		createdAt: 'created_at', 
// 		updatedAt: 'updated_at'
// 	}

// });
