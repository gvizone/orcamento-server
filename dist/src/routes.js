'use strict';

var express = require('express');

var routes = express.Router();

var ObjetoController = require('./controllers/ObjetoController');

routes.get('/api', ObjetoController.index);
routes.post('/api', ObjetoController.store);

module.exports = routes;