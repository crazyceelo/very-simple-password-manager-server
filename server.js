// require packages
const express = require('express');
const cors = require('cors');
const PORT =  process.env.PORT || 8081;
const app = new express();
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// server configuration
// const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('public'));

// mongo db configuration
mongoose.connect('mongodb://localhost/very-simple-password-manager');

// var uriString = 
//   process.env.MONGOLAB_URI ||
//   process.env.MONGOHQ_URL ||
// i think this is generated by mlab
  //"mongodb://heroku_vwl6sx5c:ee8db3m3o8nbgjnkftgienn1ui@ds121674.mlab.com:21674/heroku_vwl6sx5c";

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('Mongoose Error: ', error);
});

db.once('open', () => {
  console.log('Mongoose connection successful.');
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});

// require db models
const AppDetails = require('./models/appDetails');

// API
app.get('/current-app', (req, res) => {
  AppDetails.find(function (err, data) {
    console.log(data);
    res.send(data);
  });
});

app.post('/new-app', (req, res) => {
  // console.log('test');
  // res.send('test');
});

app.put('/update-app', (req, res) => {
  console.log('test');
  res.send('test');
 // need to put mongoose actions here
})

app.delete('/delete-app', (req, res) => {
  console.log('test');
  res.send('test');
  // need to put mongoose actions here
})