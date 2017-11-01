ROSM.Geocoder = {
  call: function(gui_id, marker_id, query, callback) {
    if(query == "") {
      return;
    }

    if(query.match(/^\s*[-+]?[0-9]*\.?[0-9]+\s*[,;]\s*[-+]?[0-9]*\.?[0-9]+\s*$/)){
      var coord = query.split(/[,;]/);
      ROSM.Geocoder.onclickResult(marker_id, coord[0], coord[1]);
      ROSM.Geocoder.updateAddress(marker_id);
      return;
    }

    var call = ROSM.DEFAULTS.HOST_GEOCODER_URL + "json" + "?address=" + query + "&sensor=false";
    //var call = ROSM.DEFAULTS.HOST_GEOCODER_URL + "?format=json" + "&limit=30&q=" + query;

    ROSM.JSON.clear("geocoder");
    ROSM.JSON.call("geocoder", {
      type: 'GET',
      url: call
    }, function(response) {
      // callback();
      if(gui_id == "hidden-something"){
        console.log(response);
        ROSM.Geocoder.showGeoResultOnHidden(marker_id, response);
      } else if(gui_id === "search-point-result"){
        ROSM.Geocoder.showGeoResultOnSearch(response);
      }
    });

    // prioritize results in currently shown mapview
    // var bounds = OSRM.G.map.getBounds();
    // call += "&viewbox=" + bounds._southWest.lng + "," + bounds._northEast.lat + "," + bounds._northEast.lng + "," + bounds._southWest.lat;
    // OSRM.JSONP.call( call, OSRM.Geocoder._showResults, OSRM.Geocoder._showResults_Timeout, OSRM.DEFAULTS.JSONP_TIMEOUT, "geocoder_"+marker_id, {marker_id:marker_id,query:query} );
  },

  showGeoResultOnHidden: function(marker_id, response) {
    // ROSM.G.markers.setSource(new L.latLng(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng));
    var s = ""
    document.getElementById("hidden-something").style.display = 'block';
    if(response.results.length == 0) {
      document.getElementById("geocoder-result").innerHTML = "We can't find this location. Please refine your search.";
      return;
    }
    // <div class="content"><a class="header">' + response.result[i] + '</a>' +
    console.log(response);
    for(var i = 0; i < response.results.length; i++) {
      var x = [];
      for(var j = 1; j < response.results[i].address_components.length; j++) {
        x.push(response.results[i].address_components[j].long_name);
      }
      var y = '<div class="geometry item"><i class="map marker icon"></i><div class="content">' +
      '<div class="header">' + response.results[i].address_components[0].long_name + '</div>' +
      '<div class="discription">' + x.join(', ') + '</div>' +
      '</div></div>';
      s += y;
    }
    document.getElementById("geocoder-result").innerHTML = s;

    var it = document.getElementsByClassName("geometry item");
    console.log(it.length);
    console.log(response.results.length);
    for(var k = 0; k < it.length; k++) {
      //console.log(k);
      //console.log(response.results[k].geometry.location.lat);
      (function(){
        var lat = response.results[k].geometry.location.lat;
        var lng = response.results[k].geometry.location.lng;
        it[k].onclick = function() {ROSM.GUI.geocoderCancel(); ROSM.Geocoder.onclickResult(marker_id, lat, lng);};
      })();
    }
    //ROSM.Routing.getRoute();
  },

  showGeoResultOnSearch: function(response) {
    var s = ""
    if(response.results.length == 0) {
      document.getElementById("search-point-result").innerHTML = "We can't find this location. Please refine your search.";
      return;
    }
    for(var i = 0; i < response.results.length; i++) {
      var x = [];
      for(var j = 1; j < response.results[i].address_components.length; j++) {
        x.push(response.results[i].address_components[j].long_name);
      }
      var y = '<div class="geometry-search item"><i class="map marker icon"></i><div class="content">' +
      '<div class="header">' + response.results[i].address_components[0].long_name + '</div>' +
      '<div class="discription">' + x.join(', ') + '</div>' +
      '</div></div>';
      s += y;
    }
    document.getElementById("search-point-result").innerHTML = s;

    var it = document.getElementsByClassName("geometry-search");
    for(var k = 0; k < it.length; k++) {
      //console.log(k);
      //console.log(response.results[k].geometry.location.lat);
      (function(){
        var lat = response.results[k].geometry.location.lat;
        var lng = response.results[k].geometry.location.lng;
        var name = response.results[k].address_components[0].long_name;
        var n = name.split(' ').join('_');
        it[k].onclick = function() {
          if(ROSM.G.markers.tmp) {
            ROSM.G.markers.tmp.hide();
          }
          ROSM.G.markers.setTmp(new L.latLng(lat, lng));
          ROSM.G.markers.tmp.addPopup(
              "<div class='ui segment'>" +
              "<div class='ui top attached label'> POI </div>" +
              "<h2>" + name + "</h2>" +
              "<div class='ui center aligned basic segment'>" +
              "<div class='ui tmp marker green button' onclick=ROSM.GUI.addVia('tmp'," + "\"\"," + lat + "," + lng + ",\"" + n + "\")>" +
              "<i class='plus icon'></i>Add to Trip</div>" +
              "</div></div></div>");
          ROSM.G.markers.tmp.show();
          ROSM.G.markers.tmp.centerView();
        };
      })();
    }
  },

  onclickResult: function(marker_id, lat, lon, zoom) {
    var index;
    if( marker_id === ROSM.C.SOURCE_LABEL ) {
      index = ROSM.G.markers.setSource(new L.LatLng(lat, lon));
    } else if( marker_id === ROSM.C.TARGET_LABEL ) {
      index = ROSM.G.markers.setTarget(new L.LatLng(lat, lon));
    } else {
      return;
    }
    ROSM.G.markers.route[index].show();
    ROSM.G.markers.route[index].centerView(zoom);
    if(ROSM.G.markers.route.length > 1) {
      ROSM.Routing.getRoute();
    }
  },

  updateAddress: function(marker_id) {
    var lat = null;
    var lng = null;

    if(marker_id == ROSM.C.SOURCE_LABEL && ROSM.G.markers.hasSource()) {
      lat = ROSM.G.markers.route[0].getLat();
      lng = ROSM.G.markers.route[0].getLng();
      document.getElementById("gui-input-source").value = lat + "," + lng;
    } else if(marker_id == ROSM.C.TARGET_LABEL && ROSM.G.markers.hasTarget() ) {
      lat = ROSM.G.markers.route[ROSM.G.markers.route.length-1].getLat();
      lng = ROSM.G.markers.route[ROSM.G.markers.route.length-1].getLng();
      document.getElementById("gui-input-target").value = lat + "," + lng;
    } else {
      return;
    }
  }
}
