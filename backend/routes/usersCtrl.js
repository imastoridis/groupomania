// Imports

var bcrypt = require('bcrypt')
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models')
var asyncLib = require('async')
const { json } = require('body-parser')

//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/


//Routes
module.exports = {
    //Registration for new user
    register: function (req, res) {
        //Params
        var email = req.body.email
        var username = req.body.username
        var password = req.body.password
        var bio = req.body.bio

        //Verification that all fields are not empty
        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' })
        }

        //Verification that inputs are correct (lenght, password strenght)
        if (username.lenght >= 13 || username.lenght <= 4) {
            return res.status(400).json({ 'error': "Le nom d'utilisateur doit être compris entre 4 et 13 caractères" })
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': "Le mail n'est pas valide" })
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': "Le mot de passe n'est pas valide (entre 4 a 8 caractères et un chiffre)" })
        }

        //Functions waterfall for user creation
        asyncLib.waterfall([
            //Checks if user is in DB with email
            function (done) {
                models.User.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                    .then(userFound => {
                        done(null, userFound); //done (callback) so we execute next function, we put params we need for next function
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': 'Authentification utilisateur non possible' });
                    });
            },
            //If user doesn't exist we hash the password; else 409 error      
            function (userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 10, function (err, bcryptedPassword) { //Password stored hashed in bcryptedPassword
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'Utilsateur existe déjà' });
                }
            },
            //Creates new user 
            function (userFound, bcryptedPassword, done) {
                var newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                    .then(newUser => {
                        done(newUser);
                    })
                    .catch(err => {
                        return res.status(500).json({ 'error': "Ajout de d'utilisateur non possible" });
                    });
            }
        ], function (newUser) {
            //If newUser existes, 201 : user created         
            if (newUser) {
                return res.status(201).json({
                    'userId': newUser.id
                });
            } else {
                return res.status(500).json({ 'error': "Ajout de d'utilisateur non possible" });
            }
        });
    },

    //Login for existing user
    login: function (req, res) {
        //params
        var email = req.body.email
        var password = req.body.password

        //Verification mail regex and password lenght
        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Parametres manquants' })
        }

        //Functions waterfall for user login
        asyncLib.waterfall([
            //Finds user by email
            function (done) {
                models.User.findOne({
                    where: { email: email }
                })
                    .then(userFound => {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'Authentification utilisateur non possible' });
                    });
            },
            //If user found, compares DB password with user input
            function (userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'Utilisateur inéxistant' });
                }
            },
            //If password ok the login, else error
            function (userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'mot de passe invalide' });
                }
            }
        ],
            //If user found, creation of Token
            function (userFound) {
                if (userFound) {
                    return res.status(201).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                } else {
                    return res.status(500).json({ 'error': 'Login impossible' });
                }
            }
        );
    },
    //
    getUserProfile: function (req, res) {
        // Getting auth header, check against Token
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) //If TOKEN is not valid
            return res.status(400).json({ 'error': 'token éroné' });
        //Find a user (by userID) and get specific attributes
        models.User.findOne({
            attributes: ['id', 'email', 'username', 'bio'],
            where: { id: userId }
        })
            .then(function (user) {
                if (user) {
                    res.status(201).json(user);
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé' });
                }
            })
            .catch(err => {
                res.status(500).json({ 'error': "Récupération de l'utilisateur impossible" });
            });
    },
    //Updates profil (bio)
    updateUserProfile: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        var bio = req.body.bio;
        var username = req.body.username
        var email = req.body.email

        asyncLib.waterfall([
            //Find user and get attributes i want to modify
            function (done) {
                models.User.findOne({
                    attributes: ['id', 'bio', 'username'],
                    where: { id: userId }
                })
                    .then(userFound => {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'Authentification utilisateur non possible' });
                    });
            },
            //If user exists, update attribute
            function (userFound, done) {
                if (userFound) {
                    userFound.update({
                        bio: (bio ? bio : userFound.bio), //If body.bio is valid i modify it, else i put the body.bio
                        username: (username ? username : userFound.username),
                        email: (email ? email : userFound.email)
                    })
                        .then(() => {
                            done(userFound);
                        })
                        .catch(function (err) {
                            res.status(500).json({ 'error': 'Modification impossible' });
                        });
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé' });
                }
            },
        ],
            //If user exists, res 201 and updates
            function (userFound) {
                if (userFound) {
                    return res.status(201).json(userFound);
                } else {
                    return res.status(500).json({ 'error': 'Modification du profil impossible' });
                }
            }
        );
    },

    deleteUserProfile: function (req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId1 = jwtUtils.getUserId(headerAuth);
        // console.log(userId1)
        // Params
        var bio = req.body.bio;
        var username = req.body.username
        var email = req.body.email
        var messageId = req.params.id

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    attributes: ['id', 'bio', 'username'],
                    where: { id: userId1 }
                })
                    .then(userFound => {
                        models.Like.destroy({
                            where: { userId: 14 }
                        })
                            .then(likeFound => {
                                models.Comment.destroy({
                                    where: { userId: userId1 }
                                })
                            })
                            .then(commentFound => {
                                models.Message.destroy({
                                    where: { userId: userId1 }
                                })
                            })
                            .then(messageFound => {
                                models.User.destroy({
                                    where: { id: userId1 }
                                })
                                return res.status(201).json(messageFound);
                            })
                            .catch(err => {
                                return res.status(500).json({ 'error': 'Pas possible de supprimer le message' });
                            });
                    })
            }
        ])
    }
}


