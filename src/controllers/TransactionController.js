const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const utils = require('../utils/utils');

module.exports = {
  async listByAccountId (req, res) {
    await Transaction
      .find({ account: { _id: req.params.accountId } }, (err, data) => {
        if (err) return res.json(utils.handleError(err));
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
  }
};
