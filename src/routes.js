const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
routes.get('/user', UserController.list);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);

const AccountController = require('./controllers/AccountController');
routes.get('/account/:userId', AccountController.accountsByUserId);
routes.post('/account', AccountController.store);

const TransactionController = require('./controllers/TransactionController');
routes.get('/transaction/:accountId', TransactionController.listByAccountId);
routes.post('/transaction', TransactionController.store);

module.exports = routes;
