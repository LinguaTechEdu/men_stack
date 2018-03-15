var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.send('Home is working!')
});

router.get('/healthcheck', function(req, res) {
    console.log('Health check ...');
    res.send("Healthy")
});

module.exports = router;
