const Transaction = require('../models/Transaction');

module.exports = {
  async listByAccountId (req, res) {
    console.log(req);
    const transactions = await Transaction.find({ account: { _id: req.params.accountId } });
    return res.json(transactions);
  },
  async store (req, res) {
    const transaction = await Transaction.create(req.body);
    req.io.emit('transaction', transaction);
    return res.json(transaction);
  }
};
