'use strict';

var Objeto = require('../models/Objeto');

module.exports = {
  index: async function index(req, res) {
    console.log(req);
    var objetos = await Objeto.find({});
    return res.json(objetos);
  },
  store: async function store(req, res) {
    var objeto = await Objeto.create(req.body);
    req.io.emit('objeto', objeto);
    return res.json(objeto);
  }
};