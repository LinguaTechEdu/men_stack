var express = require('express'),
    router = express.Router(),
    db = require('../models/index');

// VERIFY AUTHENTICATION
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("User authenticated.");
        return next(); }
    res.redirect('/login');
}

router.use('/', ensureAuthenticated);

// ===================================================================
// ROUTES: REGISTERED USER PAGES - ENSURE AUTHENTICATED
// ===================================================================

// List users
router.get('/', function(req, res) {
    db.User.find({}, function(err, users) {
        if (err) {
            console.log(err);
            res.status(400);
        } else {
            console.log('All users fetched.');
            res.status(200).render('users/index', { user: req.user });
        }
    })
});

// Show user
router.get('/:id', function(req, res) {
    db.User.findOne(req.body.id, function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log('User found ...');
            res.status(200).render('users/show', { user: req.user });
        }
    })
});

// Create user
router.post('/new', function(req, res) {
    db.User.create(req.body, function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log('User created ...');
            // TODO: log the user in, creating req.user
            res.status(201).render('users/show', { user: user})
        }
    })
});

// Delete user
router.delete('/:id', function(req, res) {
    db.User.remove(req.body.id, function(err) {
        if (err) {
            console.log(err);
            res.status(400).json({error: 'Could not remove.'});
        } else {
            console.log("User removed.");
            res.status(200).redirect('/');
        }
    })
});

module.exports = router;
