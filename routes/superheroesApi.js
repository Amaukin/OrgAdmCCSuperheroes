var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superheroe = require('../models/superheroes');

const ERROR_ENCONTRADO = 'Hubo un error';
const SUPERHEROE_ELIMINADO = 'Se ha eliminado al superheroe';
const SUPERHEROE_NO_EXISTE = 'No se ha encontrado el superheroe';
const SUPERHEROE_YA_EXISTE = 'Ese superheroe ya está registrado';

/* GET superheroes listing. */
router.get('/', function(req, res, next) {
  Superheroe.find({}, function(err, superheroes) {
    res.json(superheroes);
  })
});

/* POST superheroe. */
router.post('/', async function (req, res, next) {
  var nombreHeroe = req.body.nombre;
  var nombreHeroeUpper = nombreHeroe.toUpperCase();
  const superheroeEncontrado = await Superheroe.findOne({ nombre: nombreHeroeUpper });
  if (superheroeEncontrado) {
    res.send(SUPERHEROE_YA_EXISTE);
    res.send(SUPERHEROE_YA_EXISTE);
  } else {
    req.body = sanitizarSuperheroe(req.body);
    var superheroe = Superheroe({
      _id: mongoose.Types.ObjectId(),
      nombre: req.body.nombre,
      alineacion: req.body.alineacion,
      equipo: req.body.equipo,
      superpoderes: req.body.superpoderes,
      imagen: req.body.imagen,
      franquicia: req.body.franquicia
    });
    superheroe.save((err, superheroe) => {
      if (err) {
        console.log(ERROR_ENCONTRADO, err); 
      } else {
        res.redirect('../superheroes');
      }
    });
  }
});

/* PATCH superheroe to update. */
router.patch('/:id', async function (req, res, next) {
  var superheroeId = req.params.id;
  var superheroeEncontrado = await Superheroe.findOne({ _id: superheroeId });
  if (superheroeEncontrado) {
    if (req.body.nombre) superheroeEncontrado.nombre = req.body.nombre;
    if (req.body.alineacion) superheroeEncontrado.alineacion = req.body.alineacion;
    if (req.body.equipo) superheroeEncontrado.equipo = req.body.equipo;
    if (req.body.superpoderes) superheroeEncontrado.superpoderes = req.body.superpoderes;
    if (req.body.imagen) superheroeEncontrado.imagen = req.body.imagen;
    if (req.body.franquicia) superheroeEncontrado.franquicia = req.body.franquicia;

    await superheroeEncontrado.save();

    res.send(superheroeEncontrado);
  } else {
    res.send(404, SUPERHEROE_NO_EXISTE);
  }
});

/* PATCH superheroe to update. */
router.post('/:id', async function (req, res, next) {
  if (req.query.isDelete) {
    Superheroe.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res.send(500, ERROR_ENCONTRADO + err);
      } else {
        res.redirect('../superheroes');
      }
    })
  } else if (req.query.isEdit) {
    var superheroeEditado = await Superheroe.findOne({ _id: req.params.id });
    req.body = sanitizarSuperheroe(req.body);
    superheroeEditado.nombre = req.body.nombre;
    superheroeEditado.alineacion = req.body.alineacion;
    superheroeEditado.equipo = req.body.equipo;
    superheroeEditado.superpoderes = req.body.superpoderes;
    superheroeEditado.imagen = req.body.imagen;
    superheroeEditado.franquicia = req.body.franquicia;
    superheroeEditado.save((err, superheroe) => {
      if (err) {
        console.log(500, ERROR_ENCONTRADO + err);
      } else {
        res.redirect('../superheroes');
      }
    });
  }
});

/* Delete superheroe. */
router.delete('/:id', async function (req, res, next) {
  Superheroe.findByIdAndDelete(req.body.id, (err) =>{
    if (err) {
      res.send(500, ERROR_ENCONTRADO + err);
    } else {
      res.send(SUPERHEROE_ELIMINADO);
    }
  })
});

/**
 * @description Sanitiza el body para eliminar atributos invalidos
 * @param {body} reqBody body del query
 * @returns body sanitizado
 */
function sanitizarSuperheroe(reqBody) {
  if (reqBody.equipo === '') delete reqBody.equipo;
  var superpoderesNull = true 
  reqBody.superpoderes.forEach((superpoder, index) => {
    if (superpoder === '') {
      reqBody.superpoderes.splice(index, 1);
    } else {
      superpoderesNull = false;
    }
  });
  if (superpoderesNull) delete reqBody.superpoderes;
  if (reqBody.imagen === '') delete reqBody.imagen;
  if (reqBody.franquicia === '') delete reqBody.franquicia;
  return reqBody
}

module.exports = router;
