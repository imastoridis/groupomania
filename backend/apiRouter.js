  
// Imports
require('dotenv').config()
var express      = require('express');
var usersCtrl    = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');
var likesCtrl    = require('./routes/likesCtrl');
var commentCtrl = require('./routes/commentCtrl')


// Router
exports.router = (function() {
  var apiRouter = express.Router();

  apiRouter.use((req, res, next) => { 
    
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000"); 
    res.setHeader('Access-Control-Max-Age', "1000")
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, client-security-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
  });

  // Users routes
  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
  apiRouter.route('/users/me/').put(usersCtrl.updateUserProfile);
  apiRouter.route('/users/me/').post(usersCtrl.getUserProfile);

  // Messages routes
  apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
  apiRouter.route('/messages/').get(messagesCtrl.listMessages);
  apiRouter.route('/messages/:id').get(messagesCtrl.listOneMessage);

  apiRouter.route('/comment').post(commentCtrl.createComment);

  // Likes
  apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);
  apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost);

  return apiRouter;
})();