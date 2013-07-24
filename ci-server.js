// Generated by CoffeeScript 1.6.3
(function() {
  var app, express, jade;

  process.title = 'ci-server';

  express = require('express');

  jade = require('jade');

  app = express();

  app.enable('trust proxy');

  app.engine('jade', jade.__express);

  app.set('views', __dirname + '/views');

  app.use(express.logger('dev'));

  app.use(express.compress());

  app.use(express.cookieParser('colorwork-ci-server'));

  app.use(express.cookieSession());

  app.use(express.bodyParser());

  app.use(express["static"](__dirname + '/public'));

  require('./error.js');

  require('./procs.js');

  (require('./params.js'))(app);

  (require('./routers'))(app);

  app.listen(4100);

}).call(this);