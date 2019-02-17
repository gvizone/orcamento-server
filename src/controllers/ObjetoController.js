const Objeto = require('../models/Objeto');

module.exports = {
  async index (req, res) {
    console.log(req);
    const objetos = await Objeto.find({});
    return res.json(objetos);
  },
  async store (req, res) {
    const objeto = await Objeto.create(req.body);
    req.io.emit('objeto', objeto);
    return res.json(objeto);
  }
};
