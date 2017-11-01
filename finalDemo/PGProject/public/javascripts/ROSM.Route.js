ROSM.Route = function() {
  this._current_route = new ROSM.SimpleRoute("current", {});
  // this._highLight_route = new ROSM.SimpleRoute("hightLight", {});
  this._current_route_style = {color:'#0033FF', weight:5, dashArray:""};
  this._highLight_route_style = {color: '#F00'};
}

ROSM.extend(ROSM.Route, {
  showRoute: function(geoJson) {
    this._current_route.setGeoJson(geoJson);
    this._current_route.setStyle(this._current_route_style);
    this._current_route.show();
  },

  // showRoute: function(geoJsons) {
  //   this._highLight_route.setGeoJson(geoJsons);
  //   // this._highLight_route.setStyle(this._current_route_style);
  //   this._highLight_route.show();
  // },

  setFormalStyle: function() {
    this._current_route.setStyle(this._current_route_style);
  },

  setHighLightStyle: function(i) {
    this._current_route.highLight(i, this._highLight_route_style);
  },

  centerView: function() {
    this._current_route.centerView();
  },

  centerViewPart: function(i) {
    this._current_route.centerViewPart(i);
  },

  hasRoute: function() {
    if(this._current_route.route.length === 0) {
      return false;
    } else {
      return true;
    }
  },

  reset: function() {
    this._current_route.hide();
    // this._highLight_route.hide();
  }
});
