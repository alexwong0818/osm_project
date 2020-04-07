
ROSM.GUI = {
  init: function() {
    console.log('-------------------ROSM.GUI.Init--------------------------');
    document.getElementById("gui-reset").onclick = function() {ROSM.GUI.resetRouting()};
    $("#gui-input-source").keyup(function(event) {if(event.keyCode == 13) ROSM.GUI.inputChanged("hidden-something", ROSM.C.SOURCE_LABEL, function() {
      ROSM.G.route.reset();
      ROSM.RoutingDescription.reset();
      ROSM.JSON.clear("routing");
    });});
    $("#gui-input-target").keyup(function(event) {if(event.keyCode == 13) ROSM.GUI.inputChanged("hidden-something", ROSM.C.TARGET_LABEL, function() {
      ROSM.G.route.reset();
      ROSM.RoutingDescription.reset();
      ROSM.JSON.clear("routing");
    });});
    $("#gui-input-search").keyup(function(event) {if(event.keyCode == 13) ROSM.GUI.inputChanged("search-point-result");});
    document.getElementById("gui-input-source").onfocus = function() {ROSM.GUI.inputFocus(ROSM.C.SOURCE_LABEL);}
    document.getElementById("gui-input-target").onfocus = function() {ROSM.GUI.inputFocus(ROSM.C.TARGET_LABEL);}
    document.getElementById("gui-reset-source").onclick = function() {ROSM.GUI.resetInput(ROSM.C.SOURCE_LABEL);}
    document.getElementById("gui-reset-target").onclick = function() {ROSM.GUI.resetInput(ROSM.C.TARGET_LABEL);}
    document.getElementById("gui-input-search").onclick = function() {ROSM.GUI.geocoderCancel();}
    document.getElementById("routing").onclick = function() {ROSM.GUI.showRouteFunction();};
    document.getElementById("search").onclick = function() {ROSM.GUI.showSearchFunction();};
    document.getElementById("poi").onclick = function() {ROSM.GUI.showPOIFunction();};
    document.getElementById("hidden-something").style.display = 'none';
    document.getElementById("gui-button-cancel").onclick = function() {ROSM.GUI.geocoderCancel();}
    document.getElementById("artsEnterainment").onclick = function() {ROSM.GUI.checkbox("artsEnterainment")}
    document.getElementById("collegeUniversity").onclick = function() {ROSM.GUI.checkbox("collegeUniversity")}
    document.getElementById("food").onclick = function() {ROSM.GUI.checkbox("food")}
    document.getElementById("nightLifeSpot").onclick = function() {ROSM.GUI.checkbox("nightLifeSpot")}
    document.getElementById("outdoorsRecreation").onclick = function() {ROSM.GUI.checkbox("outdoorsRecreation")}
    document.getElementById("professionalOthersPlaces").onclick = function() {ROSM.GUI.checkbox("professionalOthersPlaces")}
    document.getElementById("residence").onclick = function() {ROSM.GUI.checkbox("residence")}
    document.getElementById("shopService").onclick = function() {ROSM.GUI.checkbox("shopService")}
    document.getElementById("travelTransport").onclick = function() {ROSM.GUI.checkbox("travelTransport")}

  },

  inputFocus: function(marker_id, i) {
    console.log('-------------------inputFocus--------------------------');
    if(ROSM.G.markers.hasSource() && marker_id === ROSM.C.SOURCE_LABEL) {
      ROSM.G.markers.route[0].centerView();
    } else if(ROSM.G.markers.hasTarget() && marker_id === ROSM.C.TARGET_LABEL) {
      ROSM.G.markers.route[ROSM.G.markers.route.length - 1].centerView();
    } else if(ROSM.G.markers.route[i]){
      ROSM.G.markers.route[i].centerView();
    }
  },

  inputChanged: function(gui_id, marker_id, callback) {
    console.log('-------------------inputChanged--------------------------');
    if(gui_id === "hidden-something") {
      if(marker_id === ROSM.C.SOURCE_LABEL) {
        ROSM.Geocoder.call(gui_id, ROSM.C.SOURCE_LABEL, document.getElementById('gui-input-source').value, callback);
      } else if(marker_id === ROSM.C.TARGET_LABEL) {
        ROSM.Geocoder.call(gui_id, ROSM.C.TARGET_LABEL, document.getElementById('gui-input-target').value, callback);
      }
    } else if(gui_id === "search-point-result") {
      var sInput = document.getElementById('gui-input-search').value;
      console.log('---------------------------------------------');
      console.log(sInput);
      ROSM.Geocoder.call(gui_id, ROSM.C.TARGET_LABEL, document.getElementById('gui-input-search').value, callback);
    }
  },

  resetInput: function(marker_id) {
    console.log('-------------------resetInput--------------------------');
    if (marker_id === ROSM.C.SOURCE_LABEL) {
        ROSM.G.markers.removeMarker(0);
    } else if (marker_id === ROSM.C.TARGET_LABEL) {
        ROSM.G.markers.removeMarker(ROSM.G.markers.route.length - 1);
    }
  },

  resetRouting: function() {
    console.log('-------------------resetRouting--------------------------');
    document.getElementById('gui-input-source').value = "";
    document.getElementById('gui-input-target').value = "";

    ROSM.G.route.reset();
    ROSM.G.markers.removeRoute();
    ROSM.RoutingDescription.reset();
    ROSM.JSON.clear("routing");
  },

  showRouteFunction: function() {
    console.log('-------------------showRouteFunction--------------------------');
    var r = 0;
    var s = 0;
    if($('#routingFunction').position().left === $('#leftPanel').width()) {
      r = 0 - $('#routingFunction').width();
      s = $(window).width() - $('#leftPanel').width();
    } else {
      r = $('#leftPanel').width();
      s = $(window).width() - $('#leftPanel').width() - $('#routingFunction').width();
    }
    $('#searchFunction').css({left: 0 - $('#searchFunction').width()});
    $('#poiFunction').css({left: 0 - $('#poiFunction').width()});
    $('#routingFunction').stop().animate({left: r+'px'}, 300, function(){});
    $('#map').css({width: s});
  },

  showSearchFunction: function() {
    console.log('-------------------showSearchFunction--------------------------');
    var r = 0;
    var s = 0;
    if($('#searchFunction').position().left === $('#leftPanel').width()) {
      r = 0 - $('#searchFunction').width();
      s = $(window).width() - $('#leftPanel').width();
    } else {
      r = $('#leftPanel').width();
      s = $(window).width() - $('#leftPanel').width() - $('#searchFunction').width();
    }
    $('#routingFunction').css({left: 0 - $('#routingFunction').width()});
    $('#poiFunction').css({left: 0 - $('#poiFunction').width()});
    $('#searchFunction').stop().animate({left: r+'px'}, 300, function(){});
    $('#map').css({width: s});
  },

  showPOIFunction: function() {
    var r = 0;
    var s = 0;
    if($('#poiFunction').position().left === $('#leftPanel').width()) {
      r = 0 - $('#poiFunction').width();
      s = $(window).width() - $('#leftPanel').width();
    } else {
      r = $('#leftPanel').width();
      s = $(window).width() - $('#leftPanel').width() - $('#poiFunction').width();
    }
    $('#routingFunction').css({left: 0 - $('#routingFunction').width()});
    $('#searchFunction').css({left: 0 - $('#searchFunction').width()});
    $('#poiFunction').stop().animate({left: r+'px'}, 300, function(){});
    $('#map').css({width: s});
  },

  geocoderCancel: function() {
    document.getElementById("hidden-something").style.display = 'none';
  },

  addVia: function(marker_id, i,lat, lng, desc) {
    if(ROSM.G.markers.route.length < 2) {
      return;
    }

    if(marker_id === "tmp") {
      ROSM.G.markers.tmp.closePopup();
      ROSM.G.markers.tmp.hide();
      ROSM.G.markers.addVia(new L.LatLng(lat, lng), desc);
    } else {
      ROSM.G.markers.poi[marker_id][i].closePopup();
      ROSM.G.markers.addVia(new L.LatLng(lat, lng), desc);
    }
  },

  removeMarker: function(marker_id, id) {
    if(marker_id === "route") {
      ROSM.G.markers.removeMarker(id);
    }
  },

  checkbox: function(category) {
    console.log('-------------------checkbox click--------------------------');
    console.log(category);
    var cate = "#" + category;
    var cb = $(cate).find("input");
    var bounds = ROSM.G.map.getBounds();
    var center = ROSM.G.map.getCenter();

    // if(ROSM.G.POI[category].length < 1) {
    //   return;
    // }
    ROSM.JSON.clear("poi");
    if(ROSM.G.POI[category].length !== 0) {
      ROSM.G.markers.hidePOI(category);
    }

    if(cb.is(":checked")) {
      cb.prop("checked", false);
      ROSM.G.markers.hidePOI(category);
    } else {
      cb.prop("checked", true);
      ROSM.POI.call(category, bounds._southWest, bounds._northEast, center);
    }
  },

  label: function(i) {
    ROSM.G.markers.openPopup(i);
    ROSM.GUI.inputFocus(null, i);
  }
}
