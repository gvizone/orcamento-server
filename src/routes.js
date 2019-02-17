const express = require('express');

const routes = express.Router();

const ObjetoController = require('./controllers/ObjetoController');

routes.get('/api', ObjetoController.index);
routes.post('/api', ObjetoController.store);

module.exports = routes;
