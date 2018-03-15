var express = require('express'),
    app = express();
var logger = require('morgan'),
    bodyParser = require('body-parser');

// Configure app
app.set('views', __dirname + 'views');      // Views directory
app.use(express.static('public'));          // Static directory
app.use(logger('dev'));                     // Server logging
app.use(bodyParser.urlencoded({ extended: true })); // req.body

// Routes
app.use('/', require('./controllers/index'));


module.exports = app;
