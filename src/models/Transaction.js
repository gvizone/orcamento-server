const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  name: String,
  value: Number,
  date: Date,
  description: String,
  type: { type: String, enum: ['ENTRADA', 'SAIDA'], required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('transaction', TransactionSchema);
