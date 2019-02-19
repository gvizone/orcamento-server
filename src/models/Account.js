const mongoose = require('mongoose');
const Enum = require('./Enums');

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 0 },
  type: { type: String, enum: Enum.AccountType, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('account', AccountSchema);
