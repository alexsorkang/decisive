
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

// all environments
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({ secret: 'whatisthis' }));
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));


require('./routes/index')(app)

var server = app.listen(process.env.PORT || 2002, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});

