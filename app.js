/**
 * Created by Rain on 2016/12/30.
 */
const path = require('path');

const express = require('express');
const session = require('express-session');

const app = express();
app.use(session({
  name: 'socket_session_id',
  secret: 'ustar',
  resave: false,
  saveUninitialized: true
}));

app.use('/public', express.static(path.join(__dirname + '/public')));

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.all('/', function (req, res) {
  res.render('index', {});
});


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
