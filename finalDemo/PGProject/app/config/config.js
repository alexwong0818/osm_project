var path = require('path'),
  rootPath = path.normalize(__dirname + '/../..');

var config = {
  // Development Config
  //
  development: {
    server: {
      port: 3000,
      hostname: 'localhost',
    },
    database: {
      url: 'postgresql://127.0.0.1:5432',
      dbname: 'chinaosm',
      username: 'wangyiji',
      password: '111111',
    },
    root: rootPath
  },
  //
  // Production Config
  //
  production: {
    server: {
      port: process.env.OPENJS_PORT || 8080,
      hostname: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
    },
    database: {
      url: process.env.OPENSHIFT_POSTGRESQL_DB_URL || 'postgresql://127.0.0.1:5432',
      dbname: process.env.OPENSHIFT_APP_NAME || 'routingonosm'
    },
    root: rootPath
  },
  //
  // Test Config
  //
  test: {
    server: {
      port: 4001,
      hostname: 'localhost',
    },
    database: {
      // url: 'postgresql://127.0.0.1:5432',
      // table_name: 'parks'
      username: 'brandboat',
      password: '1234',
      dbname: 'test'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
