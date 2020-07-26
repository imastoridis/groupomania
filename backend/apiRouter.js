  
// Imports
require('dotenv').config()
var express      = require('express');
var usersCtrl    = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');
var likesCtrl    = require('./routes/likesCtrl');
var commentCtrl = require('./routes/commentCtrl')

var multer = require('multer');

// Router
exports.router = (function() {
//Multer config
  const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
  };
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/images');
     },
    filename: function (req, file, cb) {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype];
      cb(null, name + Date.now() + '.' + extension);
    }
  });
  var upload = multer({ storage: storage })

  var apiRouter = express.Router();
  const { static } = require('express');
  apiRouter.use('/images/', static('./images'));


  apiRouter.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000", "*"); 
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
  apiRouter.route('/users/me/').delete(usersCtrl.deleteUserProfile);

  // Messages routes
  apiRouter.route('/messages/newimage/').post(upload.single('file'), messagesCtrl.createImageMessageImage);
  apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
  apiRouter.route('/messages/').get(messagesCtrl.listMessages);
  apiRouter.route('/messages/images').get(messagesCtrl.listMessages);
  apiRouter.route('/messages/:id').delete(messagesCtrl.deleteOneMessage);
  apiRouter.route('/messages/:id').get(messagesCtrl.listOneMessage);
  apiRouter.route('/messages/:id').put(messagesCtrl.modifyMessage);

  apiRouter.route('/imagetest' , multer).post(messagesCtrl.imageTest);

  //Comments routes
  apiRouter.route('/comment/').post(commentCtrl.createComment);
  apiRouter.route('/comment/').get(commentCtrl.listComments);
  apiRouter.route('/comment/:id').delete(commentCtrl.deleteOneComment);
  apiRouter.route('/comment/:id').get(commentCtrl.listOneComment);
  apiRouter.route('/comment/:id').put(commentCtrl.modifyComment);

  return apiRouter;
})();