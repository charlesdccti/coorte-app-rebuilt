// univariada.route.js

const express = require('express');
const app = express();
const univariadaRoutes = express.Router();

// Require Univariada model in our routes module
let Univariada = require('../models/Univariada');

// Defined get data(index or listing) route
univariadaRoutes.route('/:codVar').get(function (req, res) {
  let codVar = req.params.codVar
  Univariada.find({ variavel: codVar }, { variavel: 1, nivel: 1, cod_munic_ibge_2_fam_eq: 1, ano_atual_familia: 1, n: 1, status: 2 }, function (err, univariadas) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(univariadas);
    }
  });
});

module.exports = univariadaRoutes;