// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT = 50;



// Routes
module.exports = {

    /**  Creates new message **/
    createMessage: function (req, res) {
        // Getting auth header and userId
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var title = req.body.title;
        var content = req.body.content;

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'Rien à publier' });
        }

        asyncLib.waterfall([
            //Finds user by userID
            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        done(null, userFound);
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': 'Utilisateur non authentifié' });
                    });
            },
            //Creates new message
            function (userFound, done) {
                if (userFound) {
                    models.Message.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId: userFound.id
                    })
                        .then(newMessage => {
                            done(newMessage);
                        });
                } else {
                    res.status(404).json({ 'error': 'message non crée' });
                }
            },
        ],
            //Response
            function (newMessage) {
                if (newMessage) {
                    return res.status(201).json(newMessage);
                } else {
                    return res.status(500).json({ 'error': 'message non publié' });
                }s
            });
    },

    /** Lists all messages on dashboard **/
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
            /*order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,*/
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        }).then(messages => {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "Pas de messages trouvés" });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
        });
    },

    /** Gets one message after clicking on dashboard **/
    listOneMessage: function (req, res) {
        models.Message.findByPk(req.params.id)
            .then(messages => {
                if (messages) {
                    res.status(200).json(messages);
                } else {
                    res.status(404).json({ "error": "Pas de message trouvé" });
                }
            }).catch(err => {
                console.log(err);
                res.status(500).json({ "error": "invalid fields" });
            });
    },

    /** Updates one message **/
    modifyMessage: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        console.log(headerAuth)
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var title = req.body.title;
        var content = req.body.content;

        /*if (title == null || content == null) {
            return res.status(400).json({ 'error': 'Rien à publier' });
        }*/

        asyncLib.waterfall([
            //Finds Message by messageId
            function (done) {
                models.Message.findByPk(req.params.id)
                    .then(messageFound => {
                        done(null, messageFound);
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': 'Message non authentifié' });
                    });
            },
            //If message exists, update attributes
            function (messageFound, done) {
                if (messageFound) {
                    messageFound.update({
                        title: (title ? title : messageFound.title),
                        content: (content ? content : messageFound.content)
                    })
                        .then(() => {
                            done(messageFound);
                        })
                        .catch(err => {
                            res.status(500).json({ 'error': 'Modification du message non possible' });
                        });
                } else {
                    res.status(404).json({ 'error': 'Message non trouvé' });
                }
            },
        ],
            //Response and updates message
            function (messageFound) {
                if (messageFound) {
                    return res.status(201).json(messageFound);
                } else {
                    return res.status(500).json({ 'error': 'Message non trouvé' });
                }
            });
    },

    /** Deletes one message **/
    deleteOneMessage: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization']; //To delete??
        var userId = jwtUtils.getUserId(headerAuth);
        var messageId = req.params.id

        asyncLib.waterfall([
            //Deletes comments and likes of message and the Deletes the message
            function (done) {
                models.Comment.destroy({
                    where: { messageId: messageId }
                })
                    .then(likesFound => {
                        models.Like.destroy({
                            where: { messageId: messageId }
                        })
                        done(likesFound);
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': 'Pas possible de supprimer les commentaires ou les likes' });
                    })
                    .then(commentsFound => {
                        models.Message.destroy({
                            where: { id: messageId }
                        })
                        return res.status(201).json(commentsFound)
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': 'Pas possible de supprimer le message' });
                    });
            }
        ])
    }
}

