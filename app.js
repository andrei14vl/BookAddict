var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./auth/auth');
var books = require('./routes/books');
var recommendation = require('./routes/recommendation');
var readBooks = require('./routes/readBooks');
var wishlist = require('./routes/wishlist');
var search = require('./routes/search');
var reviews = require('./routes/reviews');
var genres = require('./routes/genres');
var preferences = require('./routes/preferences');
var app = express();

var models = require('./models');



// Use local strategy to create user account
passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.find({ where: { username: username }}).then(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (password != user.password) {
        done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }).catch(function(err){
      done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.find({where: {id: id}}).then(function(user){
    done(null, user);
  }).catch(function(err){
    done(err, null);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env') === 'development';

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'verysecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


// Auth



// Serialize sessions


//test login
app.get('/loggedin', function(req, res){
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res){
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res) {
  req.logOut();
  res.send(200);
})


// Routes 
app.use('/', routes);
app.use('/users', users);
app.use('/books', books);
app.use('/recommendation', recommendation);
app.use('/readBooks', readBooks);
app.use('/wishlist', wishlist);
app.use('/search', search);
app.use('/reviews', reviews)
app.use('/genres', genres);
app.use('/preferences', preferences);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
