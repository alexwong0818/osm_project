var express   = require('express');
var path      = require('path');
var pg        = require('pg');
var config    = require(__dirname + '/app/config/config');
var app       = express();

app.config = config;

// database settings
 var db        = require('./app/config/database');
 db.connectDB();

// express settings
require('./app/config/express')(app, express);

app.listen(app.get('port'), app.get('hostname'), function () {
    console.log("\n✔ Express server listening on %s:%d in %s mode",
        app.get('hostname'), app.get('port'), app.get('env'));
});

module.exports = app;
