var express   = require('express');
var Route     = express.Router();
var config    = require('../config/config');

var routeController = require(config.root + '/app/controllers/route');

Route.get('/', function (req, res) {
  res.render('route');
});

// api routes
Route
  .get('/routing', routeController.pgr_dijkstra)

module.exports = Route;
