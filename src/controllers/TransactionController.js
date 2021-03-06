const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const utils = require('../utils/utils');

module.exports = {
  async listByAccountId (req, res) {
    const count = Object.keys(req.body).length;
    if (count !== 1 || !(req.body.accountId)) {
      res.status(400);
      return res.json(utils.handleError('Only accountId expected'));
    }
    await Transaction
      .find({ account: { _id: req.body.accountId } }, (err, data) => {
        if (err) return res.json(utils.handleError(err));
        if (!data || data.length === 0) {
          res.status(404);
          return res.json(utils.handleError('No Transactions Found'));
        }
        return res.json(utils.handleSuccess(data));
      });
  },
  async listByCategory (req, res) {
    const count = Object.keys(req.body).length;
    if (count !== 2 || !(req.body.accountId) || !(req.body.category)) {
      res.status(400);
      return res.json(utils.handleError('Only accountId and category expected'));
    }
    await Transaction
      .find({ account: { _id: req.body.accountId }, category: req.body.category }, (err, data) => {
        if (err) return res.json(utils.handleError(err));
        if (!data || data.length === 0) {
          res.status(404);
          return res.json(utils.handleError('No Transactions Found'));
        }
        return res.json(utils.handleSuccess(data));
      });
  },
  async listBySubCategory (req, res) {
    const count = Object.keys(req.body).length;
    if (count !== 2 || !(req.body.accountId) || !(req.body.subcategory)) {
      res.status(400);
      return res.json(utils.handleError('Only accountId and subcategory expected'));
    }
    await Transaction
      .find({ account: { _id: req.body.accountId }, subCategory: req.body.subcategory }, (err, data) => {
        if (err) return res.json(utils.handleError(err));
        if (!data || data.length === 0) {
          res.status(404);
          return res.json(utils.handleError('No Transactions Found'));
        }
        return res.json(utils.handleSuccess(data));
      });
  },
  async store (req, res) {
    await Account.findOne({ _id: req.body.account }, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      if (!data) {
        res.status(404);
        return res.json(utils.handleError('Account not found'));
      }
      Transaction.create(req.body, (err, data) => {
        if (err) return res.json(utils.handleError(err));
        req.io.emit('transaction', data);
        return res.json(utils.handleSuccess(data));
      });
    });
  },
  async updateCategory (req, res) {
    const transaction = req.body;
    await Transaction.findByIdAndUpdate(
      transaction.id,
      { category: transaction.category, subCategory: transaction.subCategory },
      (err, data) => {
        if (err) return res.json(utils.handleError(err));
        return res.json(utils.handleSuccess(data));
      }
    );
  }
};
