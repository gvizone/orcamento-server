const mongoose = require('mongoose');

const ObjetoSchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String
});

module.exports = mongoose.model('objeto_log', ObjetoSchema);
