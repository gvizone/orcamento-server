const Account = require('../models/Account');
const User = require('../models/User');
const utils = require('../utils/utils');

module.exports = {
  async accountsByUserId (req, res) {
    await Account.find({ user: { _id: req.params.userId } }, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      if (data.length > 0) return res.json(utils.handleSuccess(data));
      res.status(404);
      return res.json(utils.handleError('No accounts for this user'));
    });
  },
  async store (req, res) {
    await User.findOne({ _id: req.body.user }, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      if (!data) {
        res.status(404);
        return res.json(utils.handleError('User not found'));
      }
      Account.create(req.body, (err, data) => {
        if (err) return res.json(utils.handleError(err));
        req.io.emit('account', data);
        return res.json(utils.handleSuccess(data));
      });
    });
  }
};
