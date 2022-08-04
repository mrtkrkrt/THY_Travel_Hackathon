/* global L */
const leftCornerLat = 36
const leftCornerLng = 36
const rightCornerLat = 38
const rightCornerLng = 38

function convertToVirtualLocation(lat,lng){
    const realLat = Math.abs(lat - leftCornerLat) / Math.abs(leftCornerLat - rightCornerLat) * 1000
    const realLng = Math.abs(lng - leftCornerLng) / Math.abs(leftCornerLng - rightCornerLng) * 1000
    return [realLat, realLng]
}

var map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom : -1
});

var bounds = [[0,0], [1000,1000]];
var image = L.imageOverlay('https://cdn.glitch.global/2cf8c59e-5260-45cf-8a31-f35dff62e3b8/kroki.png?v=1659580727631', bounds).addTo(map);

var sol = L.latLng([ 800, 175.2 ]);
var marker = L.marker(sol).addTo(map);


var camiLoc = L.latLng(convertToVirtualLocation( 37.808057781820125,  36.68332003914541));
var cami = L.marker(camiLoc).addTo(map);

var meydanLoc = L.latLng(convertToVirtualLocation( 37.028182975763734,  36.97522598848515))
var meydan = L.marker(meydanLoc).addTo(map)

var okulLoc = L.latLng(convertToVirtualLocation( 37.13216628323792,  37.61902136475134))
var okul = L.marker(okulLoc).addTo(map)

var latlngs = Array();

latlngs.push(cami.getLatLng());
latlngs.push(meydan.getLatLng());
latlngs.push(okul.getLatLng());

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

setInterval(function(){
  let markerLoc = marker.getLatLng()
  let lat = markerLoc.lat
  let lng = markerLoc.lng
  var a = L.latLng(lat - 10,lng + 10)
  console.log(a)
  marker.setLatLng(a)
}, 1000); //

map.fitBounds(bounds);

map.on('click', function(e) {
    const realLat = e.latlng.lat / 1000 * Math.abs(leftCornerLat - rightCornerLat) + leftCornerLat
    const realLng = e.latlng.lng / 1000 * Math.abs(leftCornerLng - rightCornerLng) + leftCornerLng
    
    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    alert("Real Location Lat,Lon : " + realLat + ",  " + realLng)
});