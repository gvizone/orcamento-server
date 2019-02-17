const mongoose = require('mongoose');

const TipoEnum = ['Cartão de crédito', 'Fundo de Investimento', 'Conta Corrente', 'Poupança'];

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 0 },
  type: { type: String, enum: TipoEnum, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('account', AccountSchema);
