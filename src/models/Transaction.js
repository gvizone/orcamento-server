const mongoose = require('mongoose');
const Enum = require('./Enums');

const TransactionSchema = new mongoose.Schema({
  name: String,
  value: Number,
  date: Date,
  description: String,
  type: { type: String, enum: Enum.TransactionType, required: true },
  category: { type: String, enum: Enum.Category, default: 'Não Classificado' },
  subCategory: { type: String, enum: Enum.SubCategory, default: 'Categorizar' },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('transaction', TransactionSchema);
