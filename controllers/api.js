var express = require('express'),
    router = express.Router(),
    db = require('../models/index');
var apiDocs = require('../docs/api.json');

router.get('/', function(req, res) {
    console.log('Api is working!');
    res.status(200).json(apiDocs);
});

module.exports = router;
