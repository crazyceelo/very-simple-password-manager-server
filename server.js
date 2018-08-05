// require packages
const express = require('express');
const cors = require('cors');
const PORT =  process.env.PORT || 8080;
const app = express();
const router = express.Router();
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Application = require('./models/appDetails');
const path = require('path');


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
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
})
app.use('/api', router);

router.get('/', function (req, res) {
  // res.json({ message: 'test test' });
  res.sendFile(path)
});

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

router.route('/get')
  .get(function (req, res) {
    Application.find(function (err, data) {
      res.send(data);
    })
  })

router.route('/post').post(function (req, res) {
  var newApp = new Application();

  newApp.appName = req.body.appName;
  newApp.userName = req.body.userName;
  newApp.password = req.body.password;
  newApp.site = req.body.site;

  newApp.save(function () {

    res.json(newApp);
  })

})

router.route('/getone/:_id')
  .get(function (req, res) {
    Application.findById(req.params._id, function (err, app) {
      res.json(app);
    })
  });

router.route('/update/:_id')
  .put(function (req, res) {
    Application.findById(req.params._id, function (err, app) {
      app.password = req.body.password;
      app.appName = req.body.appName;
      app.userName = req.body.userName;

      app.save(function (err) {
        res.send(app);
      })
    })
  })


router.route('/delete/:_id')
  .delete(function (req, res) {
    Application.findByIdAndRemove(req.params._id, function (err, app) {
      res.json(app.appName + "is removed");
    })
  })