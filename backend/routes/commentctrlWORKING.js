// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
var Cookies = require('js-cookie')

// Constants
const CONTENT_LIMIT = 2;
const ITEMS_LIMIT = 50;

// Routes
module.exports = {

    //Creates new Comment
    createComment: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var content = req.body.content;

        if (content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }
        //
        asyncLib.waterfall([

            //Finds user by userID
            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                        //console.log(userFound)
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });

            },
            //Check that user is valid
            /*function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                        //console.log(userFound)
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });

            },*/
            function (userFound, done) {

                if (userFound) {
                    models.Comment.create({
                        content: content,
                        likes: 0,
                        userId: userFound.id,
                        //messageId :tokenId
                    })
                        /*models.Message.findByPk({ id: req.params.id }, req.body, function (err, comment) {
                            res.send.Comment
                        })*/
                        .then(function (newComment) {
                            done(newComment);

                        });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
            
        ], function (newComment) {
            if (newComment) {
                return res.status(201).json(newComment);
                
            } else {
                return res.status(500).json({ 'error': 'cannot post message' });
            }
            /*if (newComment) {
                let tokenId = Cookies.get('tokenId')
                models.Comment.update(
                    { messageId: tokenId },
                    { where: { messageId: tokenId } }
                    
                ).then(res => {
                    
                    return res.status(201).json(newComment);
                })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user 3' });
                    });
            }*/

        });
    },

    //Lists all Comment on message page
    listComments: function (req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;
        //Limits on number of messages per page
        if (limit > ITEMS_LIMIT) {
            limit = ITEMS_LIMIT;
        }
        //Verification that messages are not empty 
        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        }).then(function (messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "no messages found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },

    //Gets one Comment after clicking on dashboard
    listOneComment: function (req, res) {
        models.Message.findByPk(req.params.id)
            .then(function (messages) {
                if (messages) {
                    res.status(200).json(messages);
                } else {
                    res.status(404).json({ "error": "no messages found" });
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).json({ "error": "invalid fields" });
            });
    }
}

