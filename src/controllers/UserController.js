const User = require('../models/User');

module.exports = {
  async list (req, res) {
    console.log(req);
    const users = await User.find({}).sort('-createdAt');
    return res.json(users);
  },
  async login (req, res) {
    console.log(req);
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    return res.json(user);
  },
  async store (req, res) {
    const user = await User.create(req.body);
    req.io.emit('user', user);
    return res.json(user);
  }
};
