const path = require('path');
const express = require('express');
const session = require('express-session');

const helmet = require('helmet');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const routes = require('./router');
const CONFIG = require('./config');

const app = express();


mongoose.set('useFindAndModify', false);
// mongoose.connect(`mongodb+srv://${CONFIG.mongodb.username}:${CONFIG.mongodb.password}@cluster0-wdvvb.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
mongoose.connect('mongodb://127.0.0.1:27017/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true
  });
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'mongoose err:'));//it works
db.once('open', () => {console.log('we\'re connected');});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//include some protection
app.use(helmet());

// serve static files from template
app.use('/static', express.static(path.join(__dirname + '/static/')));

// include routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.sendFile(path.join(__dirname + '/routes/templates/badway.html'));
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

/*
let str='asd{{asdasd}} sadadgr{{asdfe }}';
str.match(/{{\s*[\w\.]+\s*}}/g)
   .map(function(x) { return x.match(/[\w\.]+/)[0]; });
*/
module.exports = app;
