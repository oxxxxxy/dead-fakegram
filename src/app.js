const path = require('path');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const pg = require('pg');
const _debug = require('debug');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const CONFIG = require('./config');

const app = express();

// const POOL = new pg.Pool({
//   user: CONFIG.postgresql.user,
//   host: CONFIG.postgresql.host,
//   database: CONFIG.postgresql.database,
//   password: CONFIG.postgresql.password,
//   port: CONFIG.postgresql.port
// });
//
// const client = new mongodb.MongoClient('mongodb://127.0.0.1:27017/',
//     {useUnifiedTopology : true}
//   );
//
// const mainList = client.db('test').collection('');
//
// //use sessions for tracking logins
// app.use(session({
//   secret: 'HAXYR R TYT HY}I{EH?',
//   resave: false,
//   saveUninitialized: false,
//   store: new (require('connect-pg-simple')(session))({
//     pool : POOL,
//     tableName : 'session'
//   }),
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
// }));

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//include some protection
app.use(helmet());

// serve static files from template
app.use('/public', express.static(path.join(__dirname + '/public/')));

// include routes
app.use(require('./routes'));

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

module.exports = app;
