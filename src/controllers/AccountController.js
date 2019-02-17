const Account = require('../models/Account');

module.exports = {
  async accountsByUserId (req, res) {
    console.log(req);
    const accounts = await Account.find({ user: { _id: req.params.userId } });
    return res.json(accounts);
  },
  async store (req, res) {
    const account = await Account.create(req.body);
    req.io.emit('account', account);
    return res.json(account);
  }
};
