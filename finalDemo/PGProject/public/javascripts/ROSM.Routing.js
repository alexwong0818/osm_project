
ROSM.Routing = {
  init: function() {
    ROSM.G.markers = new ROSM.Markers();
    ROSM.G.route = new ROSM.Route();
  },

  showRoute: function(response) {
    if(!response) {
      return;
    }

    if(!ROSM.G.markers.hasSource() || !ROSM.G.markers.hasTarget()) {
      return;
    }

    if(ROSM.G.route.hasRoute()) {
      ROSM.G.route.reset();
    };

    ROSM.G.response = response;
    ROSM.RoutingGeometry.show(ROSM.G.response);
    ROSM.RoutingDescription.show(ROSM.G.response);
    ROSM.G.route.centerView();
  },

  getRoute: function() {
    var points = [];
    if(ROSM.G.markers.route.length < 2) {
      ROSM.G.route.reset();
      return;
    }

    for(var i = 0; i < ROSM.G.markers.route.length; i++) {
      var coord = {
        "lat": ROSM.G.markers.route[i].getLat(),
        "lng": ROSM.G.markers.route[i].getLng()
      };
      points.push(coord);
    }
    // console.log(points);
    ROSM.G.route.reset();
    ROSM.JSON.clear("routing");
    ROSM.JSON.call("routing", {
      type: "GET",
      url: "/routing",
      dataType: "json",
      data: {
        latlngs: points
      }
    }, this.showRoute);
  }
}
