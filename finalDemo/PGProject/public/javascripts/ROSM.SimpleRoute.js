
ROSM.SimpleRoute = function(label, style) {
  this.label = (label ? label : "route");
  this.route = [];
  this.shown = false;
  this.style = style;
  //this.route.on('click', this.onClick);
}

ROSM.extend(ROSM.SimpleRoute, {
  show: function() {
    for(var i = 0; i < this.route.length; i++) {
      this.route[i].show();
    }
    this.shown = true;
  },

  hide: function() {
    for(var i = 0; i < this.route.length; i++) {
      this.route[i].hide();
    }
    this.shown = false;
  },

  setGeoJson: function(response) {
    this.route = [];
    for(var i = 0; i < response.length; i++) {
      for(var j = 0; j < response[i].length; j++){
        var r = new ROSM.GeoJson("", this.style);
        r.setGeoJson(response[i][j].lines);
        this.route.push(r);
      }
    }
  },

  setStyle: function(style) {
    for(var i = 0; i < this.route.length; i++) {
      this.route[i].setStyle(style);
    }
  },

  highLight: function(i, style) {
    // console.log(style);
    this.route[i].setStyle(style);
  },

  centerView: function() {
    var group = new L.featureGroup();
    for(var i = 0; i < this.route.length; i++){
      group.addLayer(this.route[i].route);
    }
    ROSM.G.map.fitBounds(group.getBounds());
  },

  centerViewPart: function(i) {
    ROSM.G.map.fitBounds(this.route[i].getBounds());
  }
});
