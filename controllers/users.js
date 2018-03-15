var express = require('express'),
    router = express.Router(),
    db = require('../models/index');

router.get('/', function(req, res) {
    res.send('Users is working!')
});

router.get('/new', function(req, res) {
    var user = new db.User({ username: 'kay', email: 'kay@ex.co' });
    user.save(function(err, newUser) {
        if (err) {
            console.log(err);
            res.send(400).res.json(err);
        } else {
            console.log('User created: ');
            res.status(201).json(newUser);
        }
    })
});

module.exports = router;
