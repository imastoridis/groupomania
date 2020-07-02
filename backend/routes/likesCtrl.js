// Imports
var models = require('../models');
var jwtUtils = require('../utils/jwt.utils');
var asyncLib = require('async');

// Constants
const DISLIKED = 0;
const LIKED = 1;

// Routes
module.exports = {
    likePost: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params,
        var messageId = parseInt(req.params.messageId);

        if (messageId <= 0) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        asyncLib.waterfall([
            // Checks that id of message exists
            function (done) {
                models.Message.findOne({
                    where: { id: messageId }
                })
                    .then(function (messageFound) {
                        done(null, messageFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify message' });
                    });
            },
            //Checks that message was found
            function (messageFound, done) {
                if (messageFound) {
                    models.User.findOne({
                        where: { id: userId }
                    })
                        .then(function (userFound) { //Finds user and stores it here
                            done(null, messageFound, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'post already liked' });
                }
            },
            //Checks if user was found
            function (messageFound, userFound, done) {
                if (userFound) {
                    models.Like.findOne({ //Checks in like table if there is already a message with userId(if user has already liked a mess.)
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                        .then(function (userAlreadyLikedFound) { //Info from check is stored here
                            done(null, messageFound, userFound, userAlreadyLikedFound);
                            
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to verify if user has already liked' });
                        });
                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            //Checks if user has already liked a message
            function (messageFound, userFound, userAlreadyLikedFound, done) {
                if (!userAlreadyLikedFound) {
                    messageFound.addUser(userFound, { isLike: LIKED }) //Adds the like in table
                        .then(function (alreadyLikeFound) {
                            done(null, messageFound, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to set user reaction 1' });
                        });
                } else {
                    if (userAlreadyLikedFound.isLike === DISLIKED) {
                        userAlreadyLikedFound.update({
                            isLike: LIKED,
                        }).then(function () {
                            done(null, messageFound, userFound);
                        }).catch(function (err) {
                            res.status(500).json({ 'error': 'cannot update user reaction 2' });
                        });
                    } else {
                        res.status(409).json({ 'error': 'message already liked' });
                    }
                }
            },
            //Updates the n° of likes (+1) on message
            function (messageFound, userFound, done) {
                messageFound.update({
                    likes: messageFound.likes + 1,
                }).then(function () {
                    done(messageFound);
                }).catch(function (err) {
                    res.status(500).json({ 'error': 'cannot update message like counter' });
                });
            },
        ],
            //Displays n° likes
            function (messageFound) {
                if (messageFound) {
                    return res.status(201).json(messageFound);
                } else {
                    return res.status(500).json({ 'error': 'cannot update message' });
                }
            });
    },
    dislikePost: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var messageId = parseInt(req.params.messageId);

        if (messageId <= 0) {
            return res.status(400).json({ 'error': 'invalid parameters' });
        }

        asyncLib.waterfall([
            function (done) {
                models.Message.findOne({
                    where: { id: messageId }
                })
                    .then(function (messageFound) {
                        done(null, messageFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify message' });
                    });
            },
            function (messageFound, done) {
                if (messageFound) {
                    models.User.findOne({
                        where: { id: userId }
                    })
                        .then(function (userFound) {
                            done(null, messageFound, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                } else {
                    res.status(404).json({ 'error': 'post already liked' });
                }
            },
            function (messageFound, userFound, done) {
                if (userFound) {
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    })
                        .then(function (userAlreadyLikedFound) {
                            done(null, messageFound, userFound, userAlreadyLikedFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to verify is user already liked' });
                        });
                } else {
                    res.status(404).json({ 'error': 'user not exist' });
                }
            },
            function (messageFound, userFound, userAlreadyLikedFound, done) {
                if (!userAlreadyLikedFound) {
                    messageFound.addUser(userFound, { isLike: DISLIKED })
                        .then(function (alreadyLikeFound) {
                            done(null, messageFound, userFound);
                        })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'unable to set user reaction &' });
                        });
                } else {
                    if (userAlreadyLikedFound.isLike === LIKED) {
                        userAlreadyLikedFound.update({
                            isLike: DISLIKED,
                        }).then(function () {
                            done(null, messageFound, userFound);
                        }).catch(function (err) {
                            res.status(500).json({ 'error': 'cannot update user reaction' });
                        });
                    } else {
                        res.status(409).json({ 'error': 'message already disliked' });
                    }
                }
            },
            function (messageFound, userFound, done) {
                messageFound.update({
                    likes: messageFound.likes - 1,
                }).then(function () {
                    done(messageFound);
                }).catch(function (err) {
                    res.status(500).json({ 'error': 'cannot update message like counter' });
                });
            },
        ], function (messageFound) {
            if (messageFound) {
                return res.status(201).json(messageFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update message' });
            }
        });
    }
}