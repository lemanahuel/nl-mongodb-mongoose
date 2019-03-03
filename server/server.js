var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('mongoose');
/* eslint global-require: 0*/
const glob = require('glob');
const path = require('path');
const _ = require('lodash');

var connectDb = () => {
  db.connect('mongodb://127.0.0.1:27017/todo-list', {
    promiseLibrary: global.Promise
  }).then(() => {
    // console.log('db-connect', DB_URI);
  }, err => {
    // console.log('err-db-connect', err);
    connectDb();
  });
};

db.Promise = global.Promise;
connectDb();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-UserId, X-Nonce' +
    ', X-Secret, X-Ts, X-Sig, X-Vendor-Sig, X-Vendor-Apikey, X-Vendor-Nonce, X-Vendor-Ts, X-ProfileId' +
    ', X-Authorization, Authorization, Token, Pragma, Cache-Control, Expires');
  res.header('Access-Control-Allow-Methods', 'HEAD,OPTIONS,GET,PUT,POST,DELETE');
  next();
});

glob('./server/modules/**/*.routes.js', {}, (err, files) => {
  _.each(files, (file) => {
    require(path.resolve(file))(app);
  });
});

app.listen(3000, () => {
  console.log('El server esta funcionando en el puerto 3000');
});