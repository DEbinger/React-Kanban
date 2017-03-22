// jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const db = require('./models');
const Card = db.Card;
const cards = require('./routes/card');
const path = require('path');


app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(bodyParser.json({
  extended:true
}));

app.use((req, res, next) => {
  next('route');
});

app.use('/api/card', cards);

app.listen(PORT, function() {
  console.log ('Server started on PORT', PORT);
});

module.exports = app;