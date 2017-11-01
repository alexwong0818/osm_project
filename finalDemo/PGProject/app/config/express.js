var logger          = require('morgan');
var path            = require('path');
var env             = process.env.NODE_ENV || 'development';
var routes          = require('../routes');
var errorHandler    = require('errorhandler');
var favicon         = require('serve-favicon');

module.exports = function (app, express) {
  app.set('env', env);
  app.set('port', app.config.server.port || 3001);
  app.set('hostname', app.config.server.hostname || '127.0.0.1');
  app.set('views', path.join(__dirname, '../../app/views'));
  app.set('view engine', 'jade');

  if (env === 'development') {
    app.use(logger('dev'));
  } else {
    app.use(logger());
  };

  // ROUTES
  app.use(routes);

  app.use(favicon(path.join(app.config.root, 'public', 'favicon.ico')));

  // load static files in /public
  app.use(express.static(path.join(app.config.root, 'public')));

  app.use(function handleNotFound(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
      res.render('404', { url: req.url, error: '404 Not Found' });
      return;
    }
  });

  if (env === 'development') {
    app.use(errorHandler());
  } else {


    app.use(function logErrors(err, req, res, next){
      if (err.status === 404) {
        return next(err);
      }
      console.log(err.stack);
      next(err);
    });

    app.use(function respondError(err, req, res, next){
      var status, message;
      status = err.status || 500;
      res.status(status);

      message = ((err.productionMessage && err.message) || err.customProductionMessage);
      if (!message) {
        if (status === 403) {
          message = 'Not Allowed';
        } else {
          message = 'Oops, there was a problem!';
        }
      }
    });
  }
}
