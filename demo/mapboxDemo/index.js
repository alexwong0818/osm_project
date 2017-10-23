/**
 * Created by mac020 on 11/10/2017.
 */
    /*
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

var v1 = new mapboxgl.LngLat(31.3838, 121.2963);

//var point = mapboxgl.LngLat.convert(v1);

*/
/*
插点
[ -89.89709901792442, 41.29146740952274]插点
 function makeGeoJSON(csvData) {
 csv2geojson.csv2geojson(csvData, {
 latfield: 'wyj',
 lonfield: 'cyy',
 delimiter: ','
 }, function(err, data) {
 map.on('load', function () {

 map.addLayer({
 'id': 'airports',
 'type': 'symbol',
 'source': {
 'type': 'geojson',
 'data': data
 },
 'layout': {
 "icon-image": "marker-15",
 "icon-size":0.5
 },
 'paint': {}
 });
 });
 });
 }


*/
var d3 = require('D3');
/*
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

var csv2geojson = require('csv2geojson');



mapboxgl.accessToken = 'pk.eyJ1Ijoid2FuZ3lpamkiLCJhIjoiY2o4bzV3cXRoMWdjaDJ3czdmcHVwNWN0OCJ9.TBjdpCys_JqHd8BnSVU1Lw';

var map = new mapboxgl.Map({
    container: 'mapview',
    style: 'mapbox://styles/mapbox/dark-v9',//'mapbox://styles/mapbox/streets-v10',
    center: [121.400338105181, 31.1347668508807],
    zoom: 15
});
*/


var tok = 'pk.eyJ1Ijoid2FuZ3lpamkiLCJhIjoiY2o4bzV3cXRoMWdjaDJ3czdmcHVwNWN0OCJ9.TBjdpCys_JqHd8BnSVU1Lw';
var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' + tok, {
    attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map('mapview')
    .addLayer(mapboxTiles)
    .setView([42.3610, -71.0587], 15);


d3.csv('../dataSource/chezhan.csv', function(datain){
    var data = {
        type: 'FeatureCollection',
        features: datain.map(function(d){
            var gj = {};
            if(d.geojson){
                gj = JSON.parse(d.geojson)
            } else {
                console.log('miss');
            }
            console.log('geojson'+gj);
            var geojson = {
                geometry: gj,
                properties: d,
                id: d.osm_id,
                type: 'Feature'
            };
            return geojson;
        })
    }
    //console.log(data);
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    L.geoJson(data, {
        style: {
            weight: 2,
            opacity: 1
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);

})