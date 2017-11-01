
ROSM.Map = {

init: function() {

  ROSM.G.map = new L.Map('map', {
      center: new L.LatLng(31.3580767, 120.7129469),
      zoom: 14,
      zoomControl: false
  });

  ROSM.G.map.addControl(new L.Control.Zoom({position:'topright'}));
  ROSM.G.map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }));
  // var northEast = new L.LatLng(26.843677401113002,125.23315429687501);
  // var southWest = new L.LatLng(20.95117999397625,116.08154296875001);
  var northEast = new L.LatLng(90, 180);
  var southWest = new L.LatLng(-90, -180);
  var bounds = new L.LatLngBounds(southWest, northEast);
  ROSM.G.map.options.maxBounds = bounds;
  ROSM.G.map.options.minZoom = 4;
  ROSM.G.map.on('click', ROSM.Map.click );
},

click: function(e) {
  if(!ROSM.G.markers.hasSource()) {
    var index = ROSM.G.markers.setSource(e.latlng);
    ROSM.Geocoder.updateAddress(ROSM.C.SOURCE_LABEL);
    ROSM.G.markers.route[index].show();
    ROSM.Routing.getRoute();
  } else if(!ROSM.G.markers.hasTarget()) {
    var index = ROSM.G.markers.setTarget(e.latlng);
    ROSM.Geocoder.updateAddress(ROSM.C.TARGET_LABEL);
    ROSM.G.markers.route[index].show();
    ROSM.Routing.getRoute();
  }

}

};
