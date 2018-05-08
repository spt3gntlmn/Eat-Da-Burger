const express = require('express');
const burger = require('../models/burger.js');

let router = express.Router();

//  ROUTES...
//  index:
router.get('/', function (req, res) {
  res.redirect('/index');
});

//  Index Page:
router.get('/index', function (req, res) {
  burger.selectAll(function (data) {
    let hbsObject = { burgers: data };
    res.render('index', hbsObject);
  });
});

//  Burger Creation
router.post('/burger/create', function (req, res) {
  burger.insertOne(req.body.burger_name, function () {
    res.redirect('/index');
  })
})

//  Devouring Burgers:
router.post('/burger/eat/:id', function (req, res) {
  burger.updateOne(req.params.id, function () {
    res.redirect('/index');
  });
});

//  Undevouring Burgers::
router.post('/burger/uneat/:id', function (req, res) {
  burger.undevour(req.params.id, function () {
    res.redirect('/index');
  });
});

//  Export routes:
module.exports = router;