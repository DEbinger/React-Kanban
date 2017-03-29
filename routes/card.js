/*jshint esversion: 6 */
const express = require('express');
const app =  express();
const bp = require('body-parser');
const router = express.Router();
const db = require('../models');
const { Card } = db;

router.use(bp.urlencoded({ extended: true }));
router.use(bp.json());


router.route('/')
  .get((req, res) => {
    Card.findAll()
    .then( cards => {
      res.send(cards);
    });
  })
  .post((req, res) => {
    console.log('post route',req.body.title);
    Card.create({
      title: req.body.title,
      priority: req.body.priority,
      status: req.body.status,
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
  })
  .then((task) => {
    console.log(task);
      res.send(task);
  });

});

router.route('/status/:status')
  .get((req, res) => {
    Card.findAll({
      where:{
        status: `${req.params.status}`
      }
    })
    .then( cards => {
      res.send(cards);
    });
  });

router.route('/priority/:priority')
  .get((req, res) => {
    Card.findAll({
      where:{
        priority: `${req.params.priority}`
      }
    })
    .then(cards => {
      res.send(cards);
    });
  });

router.delete('/:id', (req, res) => {
  Card.destroy(
  {
    where: {id: `${req.params.id}`}
  }
  )
  .then(function () {
    res.send('card deleted');
  });
});


router.put('/:id', (req, res) => {
  Card.update(
  {
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo
  },
  {where: {id: `${req.params.id}`}}
  )
  .then(function() {
    res.send('update completed');
  });
});

module.exports = router;