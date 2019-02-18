const User = require('../models/User');
const utils = require('../utils/utils');

module.exports = {
  async list (req, res) {
    console.log(req);
    const users = await User
      .find({})
      .sort('-createdAt')
      .exec((err, model) => {
        if (err) return res.json(utils.handleError(err));
        return res.json(utils.handleSuccess(model));
      });
  },
  async login (req, res) {
    const access = { email: req.body.email, password: req.body.password };
    const user = await User
      .findOne(access, (err, data) => {
        if (err) return res.json(utils.handleError(err));
        if (data) return res.json(utils.handleSuccess(data));
        res.status(404);
        return res.json(utils.handleError('user or password invalid'));
      });
  },
  async store (req, res) {
    const user = await User.create(req.body, (err, data) => {
      if (err) return res.json(utils.handleError(err));
      req.io.emit('user', data);
      return res.json(utils.handleSuccess(data));
    });
  }
};
