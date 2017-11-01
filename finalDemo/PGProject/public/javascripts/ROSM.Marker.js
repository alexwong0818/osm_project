ROSM.Marker = function(label, style, position) {
  this.position = position ? position : new L.LatLng(0,0);
  this.marker = new L.Marker(position, style);
  this.description = "";
  this.label = label ? label : "marker";
  this.shown = false;
}

ROSM.extend(ROSM.Marker, {
  show: function() {
    ROSM.G.map.addLayer(this.marker);
    this.shown = true;
  },

  hide: function() {
    ROSM.G.map.removeLayer(this.marker);
    this.shown = false;
  },

  setIcon: function(style) {
    this.marker.setIcon(style);
  },

  setPosition: function(position) {
    this.position = position;
    this.marker.setLatLng(position);
    this.hint = null;
  },

  getPosition: function() {
    return this.position;
  },

  getLat: function() {
    return this.position.lat;
  },

  getLng: function() {
    return this.position.lng;
  },

  setIcon: function(icon) {
    this.marker.setIcon(icon);
  },

  setDescription: function(str) {
    this.description = str;
  },

  getDescription: function() {
    return this.description;
  },

  setLabel: function(label) {
    this.label = label;
  },

  getLabel: function() {
    return this.label
  },

  centerView: function(zoom) {
    if( zoom == undefined ) {
      zoom = ROSM.DEFAULTS.ZOOM_LEVEL;
    }
    ROSM.G.map.setView(this.position, zoom);
  },

  addPopup: function(html) {
    this.marker.bindPopup(html);
  },

  closePopup: function() {
    this.marker.closePopup();
  },

  openPopup: function() {
    this.marker.openPopup();
  }

});
