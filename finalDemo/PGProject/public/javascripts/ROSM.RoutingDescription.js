ROSM.RoutingDescription = {
  onClickRoutingDescription: function(id) {
    ROSM.G.route.setFormalStyle();
    ROSM.G.route.setHighLightStyle(id);
    //ROSM.G.map.fitBounds(ROSM.G.route.centerView(id));
    ROSM.G.route.centerViewPart(id);
  },

  show: function(response) {
    var body = "";
    var id = 0;
    
    body += '<div class="ui segment">';
    for(var i = 0; i < response.length; i++) {
    
      var begin = ROSM.G.markers.route[i].description.split('_').join(' ');
      if(begin === "") {
        begin = "Source";
      }
      var end = ROSM.G.markers.route[i+1].description.split('_').join(' ');
      if(end === "") {
        end = "Target";
      }
    
      body += '<div class="ui vertical fromto segment">' +
          '<a class="ui green tag label" onclick="ROSM.GUI.label(' + i + ')">' + begin + '</a>' +
          '<a class="ui teal tag label" onclick="ROSM.GUI.label(' + (i+1) + ')">' + end + '</a>' +
          '</div>';

      for(var j = 0; j < response[i].length; j++) {
        
        var roadName = response[i][j].road;        
        if(roadName !== "") {
          body += '<div class="ui vertical ways segment" onclick="ROSM.RoutingDescription.onClickRoutingDescription(' +
              id + ')">' + roadName + '</div>';
        }
        id++;
      }
    }

    body += '</div>';

    document.getElementById('road').innerHTML = body;
  },

  reset: function() {
    document.getElementById('road').innerHTML = "";
  }
}
