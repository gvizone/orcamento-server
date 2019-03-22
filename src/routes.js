const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/UserController');
routes.get('/user', UserController.list);
routes.get('/user/:id', UserController.findUserById);
routes.post('/user', UserController.store);
routes.post('/user/login', UserController.login);

const AccountController = require('./controllers/AccountController');
routes.get('/account/:userId', AccountController.accountsByUserId);
routes.post('/account', AccountController.store);

const TransactionController = require('./controllers/TransactionController');
routes.post('/transaction/listById', TransactionController.listByAccountId);
routes.post('/transaction/listByCategory', TransactionController.listByCategory);
routes.post('/transaction/listBySubCategory', TransactionController.listBySubCategory);
routes.post('/transaction', TransactionController.store);
routes.put('/transaction/category', TransactionController.updateCategory);

module.exports = routes;
