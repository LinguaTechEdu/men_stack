var faker = require('faker');
var db = require('./models/index');
var count = 5;

db.User.remove({}).then(function() {
    for(var i=0; i < count; i++) {
        db.User.create({username: faker.internet.userName(),  email: faker.internet.email(), password: faker.internet.password}, function(err, user) {
            if (err) { console.log(err) }
            console.log(user);
        })
    }
});
