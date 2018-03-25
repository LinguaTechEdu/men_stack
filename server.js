var app = require('./application');
var PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`MEN stack Demo running on ${PORT} ...`);
});
