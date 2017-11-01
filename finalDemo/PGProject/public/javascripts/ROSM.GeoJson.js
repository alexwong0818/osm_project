ROSM.GeoJson = function(label, style) {
  this.label = (label ? label : "route");
  this.route = new L.geoJson([], style);
  this.shown = false;
  this.route.on('click', this.onClick);
}

ROSM.extend(ROSM.GeoJson, {
  show: function() {
    ROSM.G.map.addLayer(this.route);
    this.shown = true;
  },

  hide: function() {
    ROSM.G.map.removeLayer(this.route);
    this.shown = false;
  },

  setGeoJson: function(geojson) {
    this.route.clearLayers();
    this.route.addData(geojson);
  },

  setStyle: function(style) {
    this.route.setStyle(style);
  },

  getBounds: function() {
    var bounds = new L.featureGroup();
    bounds.addLayer(this.route);
    return bounds.getBounds();
  }
});
