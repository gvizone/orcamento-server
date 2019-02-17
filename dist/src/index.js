'use strict';

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

mongoose.connect('mongodb://localhost:27017/objeto', {
  useNewUrlParser: true
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, function () {
  console.log('Server started on port 3000');
});