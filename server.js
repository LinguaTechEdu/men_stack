var app = require('./application');
var PORT = 5000;

app.listen(PORT || process.env.PORT, function () {
    console.log(`MEN stack Demo running on ${PORT} ...`);
});
