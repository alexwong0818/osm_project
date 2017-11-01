var field = new Field();
var map;
var geoJson;
var bMarker, eMarker;

var Routing = function() {
  this.begin = null;
  this.end = null;
}

var r = new Routing();

function start() {
  field.setValue(30.4583348, 114.0914843);
}

function Field() {
  var latitude,
      longitude;
  this.getValue = function() {
    return [latitude, longitude];
  };

  this.setValue = function(lat_val, long_val) {
    latitude = lat_val;
    longitude = long_val;
    //createMap(this.getValue());
  };
}

function createMap(setPlace) {
  map = L.map('map', { zoomControl: false }).setView(setPlace, 14);
  map.addControl(L.control.zoom({position:'topright'}));
  //map.options.minZoom = 14;
  //var southWest = new L.LatLng(22.970800756838422, 120.18084213137627);
  //var northEast = new L.LatLng(23.021841032778894, 120.25491401553153);
  //var bounds = new L.LatLngBounds(southWest, northEast);
  //map.options.maxBounds = bounds;
  map.addLayer(L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }));
}

function routing() {
  document.getElementById("loading").innerHTML += '<div class="ui active dimmer"><div class="ui large inverted text loader">Loading</div></div>';
  var request = $.ajax({
    type: "GET",
    url: "/routing",
    dataType: "json",
    data: {
      beginLng: r.begin.lng,
      beginLat: r.begin.lat,
      endLng: r.end.lng,
      endLat: r.end.lat
    }
  });
  request.done(function(data) {
    console.log(data);
    if(r.begin !== null && r.end !== null) {
      var myStyle = {
        "color": "#ff7800"
      };
      geoJson = L.geoJson(data, {style: myStyle}).addTo(map);

      var str = "",
          tmp = "";

      str += "<div class='ui black header'><i class='road icon'></i> Road</div>";
      for(var i = 0; i != data.length; i++) {
        if(tmp !== data[i].road) {
          str += "<p>";
          str += data[i].road;
          str += "</p>";
        }
        tmp = data[i].road;
      }
      $("#road").html(str);
    }
    document.getElementById("loading").innerHTML = "";
  });
  request.fail(function( jqXHR, textStatus, errorThrown) {
    //document.getElementById("now-loading").remove();
    console.err("err: " + textStatus + ' ' + errorThrown);
  });
}

$("#begin").click(function() {
  var greenIcon = L.MakiMarkers.icon({icon: "rocket", color: "#008000", size: "m"});
  if(bMarker !== undefined) {
    map.removeLayer(bMarker);
  }
  if(geoJson !== undefined) {
    map.removeLayer(geoJson);
  }
  map.on('click', function(e) {
    bMarker = L.marker(e.latlng,{icon: greenIcon}).addTo(map);
    r.begin = e.latlng;
    map.off('click');

    if(r.begin !== null && r.end !== null) {
      routing();
    }
  });
});

$("#end").click(function() {
  var redIcon = L.MakiMarkers.icon({icon: "rocket", color: "#FF0000", size: "m"});
  if(eMarker !== undefined) {
    map.removeLayer(eMarker);
  }
  if(geoJson !== undefined) {
    map.removeLayer(geoJson);
  }
  map.on('click', function(e) {
    //$("#endLat").val(e.latlng.lat);
    //$("#endLng").val(e.latlng.lng);
    eMarker = L.marker(e.latlng,{icon: redIcon}).addTo(map);
    r.end = e.latlng;
    map.off('click');

    if(r.begin !== null && r.end !== null) {
      routing();
    }
  });
});

$("#reset").click(function() {
  // remove street contents in the route description field.
  $("#road").html("");
  // remove route on the map.
  if(geoJson !== undefined) {
    map.removeLayer(geoJson);
  }
  // remove begin mark on the map.
  if(bMarker !== undefined) {
    map.removeLayer(bMarker);
  }
  // remove end mark on the map.
  if(eMarker !== undefined) {
    map.removeLayer(eMarker);
  }
  // remove begin and end point.
  r.end = null;
  r.begin = null;
});

// $("#hide").click(function() {
//   r = 0 - $("#menu").width();
//   $("#menu").stop().animate({left: r+'px'}, 500, function() {
//     $("#show").show();
//   });
// });
// 
// $("#show").click(function() {
//   $("#show").hide();
//   r = 0;
//   $("#menu").stop().animate({left: r+'px'}, 500);
// })
// 
// $("#show").hide();
