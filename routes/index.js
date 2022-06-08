var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superheroe = require('../models/superheroes');

/* GET home page. */
router.get('/', function(req, res, next) {
  Superheroe.count().exec(async function (err, count) {
    var randomNumber = Math.floor(Math.random() * count)
    var randomSuperheroe = await Superheroe.findOne().skip(randomNumber);
    res.render('index', { title: 'SuperAPI', randomSuperheroe: randomSuperheroe });
  })
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  Superheroe.count().exec(async function (err, count) {
    var randomNumber = Math.floor(Math.random() * count)
    var randomSuperheroe = await Superheroe.findOne().skip(randomNumber);
    res.render('index', { title: 'SuperAPI', randomSuperheroe: randomSuperheroe });
  })
});

module.exports = router;
