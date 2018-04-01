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

// Express session: https://github.com/expressjs/session#cookiesecure
app.use(session({
    secret: 'secretkeyzdevbae',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

/**
 * CORS headers
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 *
 * Headers are information attached to every request and response. They tell you
 * what's being requested, the format (JSON, html, text, etc), and where the request
 * is coming from.
 *
 * Response headers tell the client what's allowed. We are the server in this example.
 * That means we have to define what kind of requests we'll allow.
 *
 * These settings for for local development only.
 * You should not use them for production sites. Read about environments:
 * https://en.wikipedia.org/wiki/Deployment_environment#Environments
 *
 * Note the first argument to app.use. It defines which path these headers will
 * apply to. The * symbol means the rules apply to all responses.
  */
app.use('*', function(req, res, next) {
    //
    // Allow all web domains (including localhost)
    res.header('Access-Control-Allow-Origin', '*');
    // Allow these content headers
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, Token');
    // Allow these types of requests
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, DELETE');
    // Tell Express to continue onto the next configuration
    next();
});

app.use(passport.initialize());
app.use(passport.session());
// Now that this instance of passport is configured, we can pass it to any modules that need it:
require('./config/auth')(passport);

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));


module.exports = app;
