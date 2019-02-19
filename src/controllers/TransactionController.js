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
    const transaction = await Transaction.create(req.body);
    req.io.emit('transaction', transaction);
    return res.json(transaction);
  }
};
