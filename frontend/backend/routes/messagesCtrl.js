// Imports
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');
var fs = require('fs');
var multer = require('multer')


// Routes
module.exports = {

    createImageMessage: function (req, res) {
        // Getting auth header and userId
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        let attachmentURL

        var multer = require('multer')
        var upload = multer({ dest: 'images/' })
        // Params

        var title = req.body.title;
        var content = req.body.content;
        asyncLib.waterfall([
            //Finds user by userID

            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        console.log(req.body)
                        done(null, userFound);
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': 'Utilisateur non authentifié' });
                    });
            },
            //Creates new message
            function (userFound, done) {
                console.log(req.body)
                if (userFound !== null) {
                    let attachmentURL = `${req.file.filename}`;
                    //let attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

                    if (req.file != undefined) {
                        (req, res) => {
                            try {
                                //console.log(req.file)
                                res.send(req.file);
                            } catch (err) {
                                res.send(400);
                            }
                        }
                    }
                    else {
                        attachmentURL == null
                    };

                    if ((attachmentURL == null)) {
                        res.status(400).json({ error: 'Rien à publier' })
                    } else {
                        models.Message.create({
                            title: title,
                            content: content,
                            likes: 0,
                            UserId: userFound.id,
                            attachment: attachmentURL
                        })
                            .then(newMessage => {
                                done(newMessage);
                            })
                            .catch(err => {
                                return res.status(500).json({ 'error': 'Message non authentifié' });
                            });
                    }
                }
            },
        ],
            //Response
            function (newMessage) {
                if (newMessage) {
                    return res.status(201).json(newMessage);
                } else {
                    return res.status(500).json({ 'error': 'message non publié' });
                } s
            });
    },
    /**  Creates new message **/
    createMessage: function (req, res) {
        // Getting auth header and userId
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        let attachmentURL

        var multer = require('multer')
        var upload = multer({ dest: 'images/' })
        // Params
        var title = req.body.title;
        var content = req.body.content;
        var attachment = req.body.attachment

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'Rien à publier&' });
        }

        asyncLib.waterfall([
            //Finds user by userID

            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(userFound => {
                        console.log(req.body)
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
                } s
            });
    },

    /** Lists all messages on dashboard **/
    listMessages: function (req, res) {
        var order = req.query.order;

        //Verification that messages are not empty 
        models.Message.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        })
            .then(messages => {
                if (messages) {
                    res.status(200).json(messages);
                } else {
                    res.status(404).json({ "error": "Pas de messages trouvés" });
                }
            })
            .catch(err => {
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
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ "error": "invalid fields" });
            });
    },

    /** Updates one message **/
    modifyMessage: function (req, res) {

        // Params
        var title = req.body.title;
        var content = req.body.content;

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
        //Params
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
    },


    imageTest: function (req, res) {
        //Declaration de l'url de l'image
        let attachmentURL
        //identifier qui créé le message
        //let id = utils.getUserId(req.headers.authorization)
        var id = jwtUtils.getUserId(req.headers.authorization);
        models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: id }
        })
            .then(user => {
                if (user !== null) {
                    //Récupération du corps du post
                    let content = req.body.content;
                    if (req.file != undefined) {
                        attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    }
                    else {
                        attachmentURL == null
                    };
                    if ((content == 'null' && attachmentURL == null)) {
                        res.status(400).json({ error: 'Rien à publier' })
                    } else {
                        models.Message.create({
                            content: content,
                            attachment: attachmentURL,
                            UserId: user.id
                        })
                            .then((newPost) => {
                                res.status(201).json(newPost)
                            })
                            .catch((err) => {
                                res.status(500).json(err)
                            })
                    };
                } else {
                    res.status(400).json(error);
                }
            })
            .catch(error => res.status(500).json(error));


    }
}

