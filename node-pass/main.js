var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet());
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(compression());
app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))
app.use(flash());

var authData ={
  email:'song@gmail.com',
  password:'1111',
  nickname:'song'
};

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {
    usernameField:'email',
    passwordField:'pwd'
  },
  function(username, password, done) {
    console.log('LocalStrategy',username,password );

    if(username === authData.email){
      if(password=== authData.password){
        return done(null, user);
      }else{
        return done(null, false,
          { message: 'Incorrect password.' });
      }
    }else{
        return done(null, false,
          { message: 'Incorrect username.' });
    }
    /*
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    */
  }
));





app.post('/auth/login_process',
    passport.authenticate('local',
    { successRedirect: '/',
      failureRedirect: '/auth/login'
    }));

app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
