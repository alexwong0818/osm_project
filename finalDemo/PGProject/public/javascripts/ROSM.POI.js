ROSM.POI = {
  init: function() {
    // store all response from query
    ROSM.G.POI = {};
    ROSM.G.POI.artsEnterainment = [];
    ROSM.G.POI.collegeUniversity = [];
    ROSM.G.POI.event = [];
    ROSM.G.POI.food = [];
    ROSM.G.POI.nightLifeSpot = [];
    ROSM.G.POI.outdoorsRecreation = [];
    ROSM.G.POI.professionalOthersPlaces = [];
    ROSM.G.POI.residence = [];
    ROSM.G.POI.shopService = [];
    ROSM.G.POI.travelTransport = [];
  },

  call: function(category, sw, ne, ll) {
    var categoryId = "";
    var icon;
    switch(category){
      case "artsEnterainment":
        ROSM.G.POI.artsEnterainment = [];
        categoryId = "4d4b7104d754a06370d81259";
        icon = L.MakiMarkers.icon({icon: "art-gallery", color: "#b0b", size: "m"});
        break;
      case "collegeUniversity":
        ROSM.G.POI.collegeUniversity = [];
        categoryId = "4d4b7105d754a06372d81259";
        icon = L.MakiMarkers.icon({icon: "college", color: "#b0b", size: "m"});
        break;
      case "food":
        ROSM.G.POI.food = [];
        categoryId = "4d4b7105d754a06374d81259";
        icon = L.MakiMarkers.icon({icon: "restaurant", color: "#b0b", size: "m"});
        break;
      case "nightLifeSpot":
        ROSM.G.POI.nightLifeSpot = [];
        categoryId = "4d4b7105d754a06376d81259";
        icon = L.MakiMarkers.icon({icon: "bar", color: "#b0b", size: "m"});
        break;
      case "outdoorsRecreation":
        ROSM.G.POI.outdoorsRecreation = [];
        categoryId = "4d4b7105d754a06377d81259";
        icon = L.MakiMarkers.icon({icon: "pitch", color: "#b0b", size: "m"});
        break;
      case "professionalOthersPlaces":
        ROSM.G.POI.professionalOthersPlaces = [];
        categoryId = "4d4b7105d754a06375d81259";
        icon = L.MakiMarkers.icon({icon: "town", color: "#b0b", size: "m"});
        break;
      case "residence":
        ROSM.G.POI.residence = [];
        categoryId = "4e67e38e036454776db1fb3a";
        icon = L.MakiMarkers.icon({icon: "village", color: "#b0b", size: "m"});
        break;
      case "shopService":
        ROSM.G.POI.shopService = [];
        categoryId = "4d4b7105d754a06378d81259";
        icon = L.MakiMarkers.icon({icon: "shop", color: "#b0b", size: "m"});
        break;
      case "travelTransport":
        ROSM.G.POI.travelTransport = [];
        categoryId = "4d4b7105d754a06379d81259";
        icon = L.MakiMarkers.icon({icon: "bus", color: "#b0b", size: "m"});
        break;
    }

    var call = "https://api.foursquare.com/v2/venues/search?"+
        "&ll=" + ll.lat + "," + ll.lng +
        "&ne=" + ne.lat + "," + ne.lng +
        "&sw=" + sw.lat + "," + sw.lng +
        "&categoryId=" + categoryId +
        "&client_id=ET0AOTF25OC2V5BTYXMDO1HNHT5OXFBKJHM1PO5XUSYWRBHP" +
        "&client_secret=CEEYG1FQ2C43MDMJ5MHE1QAVTIC1PTA5YKFPNHJVQVX3WYKN" +
        "&v=20140816";

    ROSM.JSON.call("poi", {
      type: "GET",
      url: call,
    }, function(response) {
      if(!response) {
        return;
      }
      ROSM.G.POI[category] = response.response.venues;
      ROSM.G.markers.setPOI(category, {"icon": icon});
      ROSM.G.markers.showPOI(category);
    })
  }
}
