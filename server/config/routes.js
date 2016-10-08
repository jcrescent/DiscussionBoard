var users = require('../controllers/users.js');
var messages = require('../controllers/messages.js');
var comments = require('../controllers/comments.js');
var topics = require('../controllers/topics.js');
var categories = require('../controllers/categories.js')
module.exports = function(app){

	// _______________users________________
	app.post('/users/create', users.create);
	app.get('/users/:id', users.show);
	

	// _______________messages________________
	app.post('/messages/create', messages.create);
	app.get('/messages', messages.index);

	// _______________comments________________
	app.post('/comments/create', comments.create);
	
	// _______________topics________________
	app.post('/topics/create', topics.create);
	app.get('/topics', topics.index);
	app.get('/topics/:id', topics.show);

	// _______________categories________________
	app.get('/category/:id', categories.show);
	app.get('/categories', categories.index);
}

