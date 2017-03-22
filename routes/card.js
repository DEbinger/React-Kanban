/*jshint esversion: 6 */
const express = require('express');
const app =  express();
const bp = require('body-parser');
const router = express.Router();
const db = require('../models');
const { Card } = db;

router.use(bp.urlencoded({ extended: true }));

router.route('/')
  .get((req, res) => {
    Card.findAll()
    .then( cards => {
      res.json({cardsList:{cards}});
    });
  })
  .post((req, res) => {
    Card.create({
      title: req.body.title,
      priority: req.body.priority,
      status: req.body.status
  })
  .delete('/:id', (req, res) => {
    Card.destroy({
      where: {id: `${req.params.id}`}
    });
  })
  .then((task) => {
      res.send();
    });
  });

router.route('/new')
  .post((req, res) => {

  });


module.exports = router;