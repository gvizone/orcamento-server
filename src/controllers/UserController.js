const User = require('../models/User');
const utils = require('../utils/utils');

module.exports = {
  async list (req, res) {
    await User.find({})
      .sort('-createdAt')
      .exec((err, model) => {
        if (err) return res.json(utils.handleError(err));
        return res.json(utils.handleSuccess(model));
      });
  },
  async findUserById (req, res) {
    await User.findOne({ _id: req.params.id }, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      if (data) return res.json(utils.handleSuccess(data));
      res.status(404);
      return res.json(utils.handleError('User not found'));
    });
  },
  async login (req, res) {
    const access = { email: req.body.email, password: req.body.password };
    await User.findOne(access, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      if (data) return res.json(utils.handleSuccess(data));
      res.status(404);
      return res.json(utils.handleError('User or password invalid'));
    });
  },
  async store (req, res) {
    await User.create(req.body, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      req.io.emit('user', data);
      return res.json(utils.handleSuccess(data));
    });
  }
};
