var mongoose = require('mongoose');
var User = require('./User');

mongoose.connect('mongodb://localhost/menstack', { promiseLibrary: global.Promise });

module.exports = {
    User: User
};
