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
app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('msg', 'Flash is back!')
  res.send('flash');
});

app.get('/flash-display', function(req, res){
  // Get an array of flash messages by passing the key to req.flash()
  var fmsg= req.flash();
  console.log(fmsg);
  res.send(fmsg);
});

var passport = require('./lib/passport')(app);

/*
var authData ={
  email:'song@gmail.com',
  password:'1111',
  nickname:'song'
};

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serialize',user);
  done(null,user.email);
 });

passport.deserializeUser(function(id, done) {
    console.log('--------------------');
    console.log('deserializeUser',id);
    done(null,authData)

});


passport.use(new LocalStrategy(
  {
    usernameField:'email',
    passwordField:'pwd'
  },
  function(username, password, done) {
    console.log('LocalStrategy',username,password );

    if(username === authData.email){
      console.log(1);
      if(password=== authData.password){
          console.log(12);
        return done(null, authData);
      }else{
        console.log(123);
        return done(null, false,
          { message: 'Incorrect password.' });
      }
    }else{
      console.log(1234);
        return done(null, false,
          { message: 'Incorrect username.' });
    }

  }
));

*/


/*
app.post('/auth/login_process',
    passport.authenticate('local',
    { successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash:true,
      successFlash:true
    }));
*/
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
