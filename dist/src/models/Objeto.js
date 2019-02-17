'use strict';

var mongoose = require('mongoose');

var ObjetoSchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String
});

module.exports = mongoose.model('objeto_log', ObjetoSchema);