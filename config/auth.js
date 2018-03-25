var LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index'),
    User = db.User;

module.exports = function(passport) {
    /* =========================================================================
     * Passport Session
     * - persistent login sessions
     * - serialize sessions and deserialize users
     */
    // serialize session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    /* =========================================================================
     * LOCAL SIGNUP
     *
     * By default, strategy name is 'local'
     * But we have multiple strategies: local signup and login
    **/
    passport.use('local-signup', new LocalStrategy({
            // By default, local uses username and password
            // Customize for login by email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            if (req.body.confirmPassword != password) {
                console.log("Passwords dont match.");
                return done(null, false, {'confirmPassword': 'Passwords dont match. Try again.'})
            }
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // VALIDATE: email unique?
                User.findOne({ 'email' :  email }, function(err, user) {
                    if (err) { return done(err); }
                    if (user) {
                        return done(null, false, {'message': 'That email is already taken.'});
                    } else {
                        // create the user
                        var newUser = new User();
                        newUser.username = req.body.username;
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            if (err){ throw err; }
                        });
                    }

                });

            });

        })
    );

    /** =========================================================================
     * LOCAL LOGIN
    */
    passport.use('local-login', new LocalStrategy({
            // By default, local uses username and password
            // Customize to use email:
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // Find the user
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err) { return done(err); }
                // if no user is found, return the message
                if (!user)
                    return done(null, false, {'message': 'No user found.'});
                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, {'message': 'Oops! Wrong password.'});

                // Return successful user
                return done(null, user);
            });

        })
    );
};
