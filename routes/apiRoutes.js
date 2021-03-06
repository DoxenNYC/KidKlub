const User = require('../models/user.model');
const UserSession = require('../models/userSession.model');
const Activity = require('../models/activity.model');
const Game = require('../models/game.model');

module.exports = app => {

    // ----- AUTHENTICATION API -----
    // ----- Sign up API endpoints
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            username
        } = body;
        const {
            passwordConfirmation
        } = body;
        let {
            profilePic
        } = body;

        if (!username) {
            return res.send({
                success: false,
                message: 'Error: Username cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        if (!passwordConfirmation) {
            return res.send({
                success: false,
                message: 'Error: Confirm Password cannot be blank.'
            });
        }

        if (password !== passwordConfirmation) {
            return res.send({
                success: false,
                message: 'Error: Password dont match.'
            });
        }

        if (profilePic === '') {
            return res.send({
                success: false,
                message: 'Error: You have to select a character.'
            });
        }

        username = username.trim();

        // 1. Verify Username doesn't exist
        // 2. Save
        User.find({
            username: username
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Username already exist.'
                });
            }

            // ----- Save the new user
            const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.profilePic = profilePic;

            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed up'
                });
            })
        });
    });

    // ----- Sign in API endpoints
    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            username
        } = body;
        if (!username) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        username = username.trim();

        User.find({
            username: username
        }, (err, users) => {
            if (err) {
                // console.log('err 2:', err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Authentication'
                });
            }
            const user = users[0];
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Authentication'
                });
            }
            // ---- Otherwise correct user
            // const profilePic = user.profilePic;
            // console.log(user);

            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    // console.log(err);
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id,
                    profilePic: user.profilePic
                });
            });
        })
    });

    // ----- FAVORITE ACTIVITY API
    // ----- Adding favorites
    app.post('/api/favorites/activities', (req, res) => {

        // console.log(req.body);
        const activity = new Activity();
        activity.title = req.body.title;
        activity.imageLink = req.body.imageLink;
        activity.link = req.body.link;
        // console.log(activity);

        activity.save(err => {
            if (err) { res.send(err) }
            else {
                res.json({
                    message: 'Favourite Activity added',
                    favorite: activity
                })
            }
        })
    })

    // ----- Fetching favorites
    app.get('/api/favorites/activities', (req, res) => {
        Activity.find((err, activities) => {
            if (err) { res.send(err) }
            else { res.json(activities) }
        })
    })

    // ----- Deleting favorites
    app.delete('/api/favorites/activities/:id', (req, res) => {
        Activity.deleteOne({ _id: req.params.id }, err => {
            if (err) { res.send(err) }
            else { res.send("Record Removed") }
        })
    })


    // ----- FAVORITE GAME API
    // ----- Adding favorites
    app.post('/api/favorites/games', (req, res) => {

        // console.log(req.body);
        const game = new Game();
        game.title = req.body.title;
        game.imageLink = req.body.imageLink;
        game.link = req.body.link;
        // console.log(activity);

        game.save(err => {
            if (err) { res.send(err) }
            else {
                res.json({
                    message: 'Favourite Game added',
                    favorite: game
                })
            }
        })
    })

    // ----- Fetching favorites
    app.get('/api/favorites/games', (req, res) => {
        Game.find((err, activities) => {
            if (err) { res.send(err) }
            else { res.json(activities) }
        })
    })

    // ----- Deleting favorites
    app.delete('/api/favorites/games/:id', (req, res) => {
        Game.deleteOne({ _id: req.params.id }, err => {
            if (err) { res.send(err) }
            else { res.send("Record Removed") }
        })
    })

};