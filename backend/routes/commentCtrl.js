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
        var messageId = req.body.MessageId////////////PROBLEM?
        var content = req.body.content;


        if (content == null) {
            return res.status(400).json({ 'error': 'missing parameters 1' });
        }

        if (content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'invalid parameters 2' });
        }

        //Waterfall for comment creation
        asyncLib.waterfall([

            //Finds user by id
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

            //Finds message by id
            function (userFound, done) {
                if (userFound) {
                    models.Message.findOne({
                        where: { id: messageId }
                    })
                        .then(function (messageFound) {
                            done(null, messageFound, userFound);
                        })
                } else {
                    console.log(messageFound)
                    res.status(500).json({ 'error': 'unable to verify user' });
                }
            },

            //Creates comment
            function (messageFound, userFound, done) {
                models.Comment.create({
                    content: content,
                    likes: 0,
                    UserId: userFound.id,
                    MessageId: messageFound.id
                })
                    .then(function (newComment) {
                        done(newComment);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user 3' });
                    })
            },
        ],
            //Posts comment
            function (newComment) {
                if (newComment) {
                    return res.status(201).json(newComment);

                } else {
                    return res.status(500).json({ 'error': 'cannot post message' });
                }
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
        models.Comment.findAll({

            order: [(order != null) ? order.split(':') : ['content', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]

        }).then(function (comments) {

            if (comments) {

                res.status(200).json(comments);
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
        //console.log((req.params.id))
        models.Comment.findByPk(req.params.id)
            .then(function (comments) {
                if (comments) {
                    res.status(200).json(comments);
                } else {
                    res.status(404).json({ "error": "no messages found" });
                }
            }).catch(function (err) {
                console.log(err);
                res.status(500).json({ "error": "invalid fields" });
            });
    }
}

