var express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    db = require('./models/index');


// Configure app
// Order is important. Be careful configure things before they
// are needed.
app.set('views', __dirname + '/views');      // Views directory
app.use(express.static('public'));           // Static directory
app.use(logger('dev'));                      // Server logging
app.use(bodyParser.urlencoded({ extended: true })); // req.body

app.set('view engine', 'ejs');      // Template engine (ejs)

app.use(session({
    secret: 'secretkeyzdevbae',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/auth')(passport);

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));


module.exports = app;
