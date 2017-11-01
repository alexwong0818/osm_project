exports.pgr_dijkstra = function(req, res) {
  //var conString = "postgres://" + config.database.username + ":"
  //   + config.database.password + "@localhost/" + config.database.dbname;
  
  var pg = require('pg');
  var config = require('../config/config');
  var async = require('async');
  var conString = config.database.url + "/" + config.database.dbname;
  var client = new pg.Client(conString);
  var reqPoint = [];

  var point = [];
  var i = 0, j = 0;
  var queryStreets = [];


  client.connect();
  
  async.waterfall([
      function(callback) {
        eliminate(req.query.latlngs, callback);
      }, function(points, callback) {
        getPgrVertices(points, callback);
      },
      function(routes, callback) {
        getDijkstra(routes, callback);
      }
    ], function(err, result) {
      if(err) {
        console.error("Error: ", err);
      } else {
        allDone(result);
      }
  });

  // delete duplicate points.
  function eliminate(points, callback) {
    var p = points;
    var eliPoints = [];

    eliPoints.push(p[0]);
    
    for(var i = 1; i < p.length; i++) {
      if(p[i].lat === p[i - 1].lat && p[i].lng === p[i - 1].lng) {
      } else {
        eliPoints.push(p[i]);
      }
    }
    callback(null, eliPoints);
  }
  
  function getPgrVertices(reqPoints, callback) {
    // get the nearest point of begin and end point in topology network(database).
    var getPoint = function getPoint(point, callback) {
    
      var qStr = "SELECT id FROM ways_vertices_pgr ORDER BY " + 
          "st_distance(the_geom, st_setsrid(st_makepoint(" +
          point.lng + "," + point.lat + "), 4326)) LIMIT 1;";
      console.log('------------------');
      console.log('sql '+qStr);
      client.query(qStr, function(err,result) {
        if(err) {
          callback(err, null);
        } else {
          console.log('====================');
          console.log('sql'+result.rows[0].id);
          callback(null, result.rows[0].id);
        }
      });
    };

    async.map(reqPoints, getPoint, function(err, result) {
      if(err) {
        callback(err, null);
      } else {
        var routes = [];
        // since the points array doesn't specify begin,
        // end of route, we need to divide them here.
        for(var i = 0; i < result.length - 1; i++) {
          var route = {"begin": result[i], "end": result[i+1]};
          routes.push(route);
        }
        callback(null, routes);
      }
    });
  }

  function getDijkstra(routesBeginEnd, callback) {
    var routes = [];

    // query pgrouting method 'dijkstra' here 
    var dijkstra = function(route, callback) {
        // 老写法
      var qStr = "WITH result AS (SELECT * FROM ways JOIN (SELECT * "+
      "FROM pgr_dijkstra('SELECT gid AS id, source, target, length AS cost "+
      "FROM ways', "+route.begin+", "+route.end+", false)) "+
      "AS route ON ways.gid = route.edge)"+
      "SELECT ST_AsEWKT(result.the_geom), name from result;";

      /*
      var qStr = "SELECT * FROM pgr_dijkstra('SELECT gid as id, source, target, cost, " +
          "reverse_cost FROM ways',"+ route.begin+","+route.end+");";
      */
      console.log(qStr);
      client.query(qStr, function(err, result) {
        if(err) {
          console.log(qStr);
          return console.error('✗ Postgresql Running Query Error', err);
        }
        console.log("success------------------------"+result);
        var r = parsingData(result.rows);

        var queryStreets = collectLines(r);
        callback(null, queryStreets);
      });
    };

    async.map(routesBeginEnd, dijkstra, function(err, result) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }); 
  }

  function toGeoJson(road, type, points) {
    if(road === "") {
      road = "unknown";
    }
    var geoJson = {
      "road": road,
      "type": type,
      "coordinates": points
    };
    return geoJson;
  }

  // parsing the result from query.
  function parsingData(data) {
    // the data is like : "SRID=4326;LINESTRING(120.2121912 22.9975817,120.2123558 22.9982876)"
    var x = 0;
    var result = [];
    for(var i = 0; i != data.length; i++) {
      var points = [];
      var y = 0;
      var tmp = data[i].st_asewkt.split('(');
      var tmp2 = tmp[1].split(')');
      var tmp3 = tmp2[0].split(',');
      for(var j = 0; j != tmp3.length; j++) {
        var tmp4 = tmp3[j].split(' ');
        var point = [tmp4[0], tmp4[1]];
        tmp4[1];
        points[y] = point;
        y++;
      }
      var geoObj = toGeoJson(data[i].name, "LineString", points);
      result[x++] = geoObj;
    }
    
    return result;
  }

  function collectLines(result) {
    var _result = [];
    var road = "";
    var lines = [];
    for(var i = 0; i < result.length; i++) {
      if(result[i].road !== road) {
        var a = {
          "road": road,
          "lines": lines
        };
        _result.push(a);
        lines = [];
      }
      road = result[i].road;
      lines.push(result[i]);
    }
    _result.push({"road": road, "lines": lines});
    
    return _result;
  }

  function allDone(data) {
    res.send(200, data);
    res.end();
    client.end();
  }
}
