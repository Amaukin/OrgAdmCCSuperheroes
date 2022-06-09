var express = require('express');
var router = express.Router();
var axios = require('axios');

var mongoose = require('mongoose');
var Schema = mongoose.Types.ObjectId;
var Superheroe = require('../models/superheroes');

const API_PATH = 'http://localhost:3000/api/';

/* GET superheroes page. */
router.get('/', async function(req, res, next) {
  var superheroesReq = await axios.get(API_PATH);
  var superheroesGrid = mapSuperheroesGrid(superheroesReq.data);
  res.render('superheroes', { title: 'Superheroes', superheroesGrid: superheroesGrid });
});

/* GET superheroe nuevo page. */
router.get('/nuevo-superheroe', async function (req, res, next) {
  res.render('superheroeNuevo', {});
});

/* GET superheroe editar page. */
router.get('/editar-superheroe/:id', async function (req, res, next) {
  var superheroeId = req.params.id;
  var superheroeEncontrado = await Superheroe.findById(superheroeId);
  res.render('superheroeEditar', { superheroe: superheroeEncontrado });
});


/* GET superheroe detalle page. */
router.get('/:id', async function (req, res, next) {
  var superheroeId = req.params.id;
  var superheroeEncontrado = await Superheroe.findById(superheroeId);
  console.log('superheroe', superheroeEncontrado);
  res.render('superheroeDetalle', { superheroe: superheroeEncontrado });
});


/**
 * @description Mapea el arreglo de superheroes para el grid del frontend
 * @param {Superheroe} superheroesData Arreglo de superheroes
 */
const mapSuperheroesGrid = (superheroesData) => {
  const arregloSuperheroesFinal = []
  let j = 0;
  let subArregloSuperheroes = []
  for (const [index, superheroe] of superheroesData.entries()) {
    subArregloSuperheroes.push(superheroe);
    j++;
    
    if (j >= 3 || !superheroesData[index+1]) {
      j = 0;
      arregloSuperheroesFinal.push(subArregloSuperheroes);
      for (const unSuper of subArregloSuperheroes) {
      }
      subArregloSuperheroes = [];
    }
  }

  return arregloSuperheroesFinal;
}

module.exports = router;
