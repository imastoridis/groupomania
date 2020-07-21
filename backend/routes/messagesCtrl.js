// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 2;
const ITEMS_LIMIT = 50;



// Routes
module.exports = {

    //Creates new message
    createMessage: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var title = req.body.title;
        var content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
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
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            //Check that user is valid
            function (userFound, done) {
                if (userFound) {
                    models.Message.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId: userFound.id
                    })
                        .then(function (newMessage) {
                            done(newMessage);
                        });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error': 'cannot post message' });
            }
        });
    },

    //Lists all messages on dashboard
    listMessages: function (req, res) {
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

    //Gets one message after clicking on dashboard
    listOneMessage: function (req, res) {
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
    },

    //Updates one message

    modifyMessage: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var messageId = req.config

        // Params
        var title = req.body.title;
        var content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }


        asyncLib.waterfall([
            //Find Message and get attributes i want to modify
            function (done) {
                models.Message.findByPk(req.params.id)
                    /*({
                        //attributes: ['id', 'title', 'content'],
                        //where: { id: messageId }
                        
                    })*/
                    .then(function (messageFound) {
                        done(null, messageFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify message' });
                    });
            },
            //If user exists, update attribute
            function (messageFound, done) {
                if (messageFound) {
                    messageFound.update({
                        title: (title ? title : messageFound.title), //If body.title is valid i modify it, else i put the body.title
                        content: (content ? content : messageFound.content)
                    })
                        .then(function () {
                            done(messageFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({ 'error': 'cannot update message' });
                        });
                } else {
                    res.status(404).json({ 'error': 'message not found 2' });
                }
            },
        ],
            //If user exists, res 201 and updates
            function (messageFound) {
                if (messageFound) {
                    return res.status(201).json(messageFound);
                } else {
                    return res.status(500).json({ 'error': 'cannot update message' });
                }
            }
        );
    },

    deleteOneMessage: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var messageId = req.params.id
        console.log(messageId)
        // Params
        var title = req.body.title;
        var content = req.body.content;


        asyncLib.waterfall([
            //Find Message and get attributes i want to modify
            function (done) {
                models.Comment.destroy({
                    where: { messageId: messageId }
                })
                    .then(function (likesFound) {
                        models.Like.destroy({
                            where: { messageId: messageId }
                        })
                        done(likesFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify like' });
                    })
                    .then(function (commentsFound) {
                        models.Message.destroy({
                            where: { id: messageId }
                        })
                        //console.log(commentsFound)
                        //done(null, commentsFound);
                        //commentsFound.destroy();
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            }/*,
            function (commentsFound, done) {
                if (commentsFound) {
                    models.Message.findByPk(req.params.id)
                        .then(function (messageFound) {
                            console.log(messageFound)
                            done(null, messageFound,commentsFound)
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to verify message' });
                        });
                }

            },
            function (comment) {
                if (messageFound) {
                    return res.status(201).json(messageFound);
                } else {
                    return res.status(500).json({ 'error': 'cannot update message' });
                }
            }
*/
            //If user exists, update attribute
            /*function (messageFound, done) {
                if (messageFound) {
                    messageFound.destroy(
                        
                    )
                        .then(function () {
                            done(messageFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({ 'error': 'cannot update message' });
                        });
                } else {
                    res.status(404).json({ 'error': 'message not found 2' });
                }
            },*/
        ],
            //If user exists, res 201 and updates
            /*function (messageFound) {
                if (messageFound) {
                    return res.status(201).json(messageFound);
                } else {
                    return res.status(500).json({ 'error': 'cannot update message' });
                }
            }*/
        );
    }




}

