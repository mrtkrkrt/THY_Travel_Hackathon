/* global L */
/* global latLng */
/* global graph */
/* global betweenTwo */
/* global distance */
/* global  initDjkstra */
//41.03697187352914, 28.868381439107438
//41.03841599183616, 28.872119295351656

/*
const leftCornerLat = 41.03697187352914
const leftCornerLng = 28.868381439107438
const rightCornerLat = 41.03841599183616
const rightCornerLng = 28.872119295351656
*/
//41.038507, 28.872552
//41.03696933129572, 28.869315179818948


initDjkstra()

const leftCornerLat = 41.03696933129572
const leftCornerLng = 28.869315179818948
const rightCornerLat = 41.038507
const rightCornerLng = 28.872552
const FAKELOC = {
  lat : 41.038334414477895,
  lng : 28.871631602523884
}
let disableFakeLoc = false

const height = 1000
const width = 1400

const destinationsElem = document.querySelector("#destinations");


var youAreHereIcon = L.icon({
    iconUrl: 'https://cdn.glitch.global/2cf8c59e-5260-45cf-8a31-f35dff62e3b8/360_F_287095204_XQl8LHp3TclCAt46ZwclkQM83lmNHSne-removebg-preview.png?v=1659651605377',
    shadowUrl : "https://cdn.glitch.global/2cf8c59e-5260-45cf-8a31-f35dff62e3b8/contact_map_marker_shadow.png?v=1659652226139",  
  
    iconSize:     [100, 100], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [32, 65], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 40],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function convertToVirtualLocation(lat,lng){
    const realLat = Math.abs(lat - leftCornerLat) / Math.abs(leftCornerLat - rightCornerLat) * height
    const realLng = Math.abs(lng - leftCornerLng) / Math.abs(leftCornerLng - rightCornerLng) * width
    return [realLat, realLng]
}

var map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom : -1
});

var polyline = null

var bounds = [[0,0], [height,width]];
var image = L.imageOverlay('https://cdn.glitch.global/2cf8c59e-5260-45cf-8a31-f35dff62e3b8/screencapture-google-maps-place-41-02-13-1-N-28-52-09-5-E-41-0375936-28-8714436-18-17z-data-4m5-3m4-1s0x0-0x2415498f91130c53-8m2-3d41-0369693-4d28-8693152-2022-08-04-23_45_10.png?v=1659646264931', bounds).addTo(map);

var sol = L.latLng([ -100, -100 ]);
var userMarker = L.marker(sol, {icon: youAreHereIcon}).addTo(map);

let markers = {}

for (const [key, value] of Object.entries(latLng)) {
    //let a = L.latLng(convertToVirtualLocation(value.lat, value.lng))
    //let marker = L.marker(a).addTo(map)
    let option = document.createElement('option')
    option.text = key;
    option.value = key;
    
    destinationsElem.appendChild(option)
  
    let marker = L.marker(convertToVirtualLocation(value.lat, value.lng),{draggable:false}).bindTooltip(key, 
    {
        permanent: true, 
        direction: 'right'
    }).addTo(map)
    
    var icon = marker.options.icon;
    icon.options.iconSize = [25, 25];
    marker.setIcon(icon);
    
    markers[key] = marker
}


setInterval(function(){
  let gps = localStorage.getItem('gpsLocation') ? JSON.parse(localStorage.getItem('gpsLocation')) : '?';
  if(gps !== '?'){
    let markerLoc = userMarker.getLatLng()
    let a = 1
    
    if(disableFakeLoc){
      a = L.latLng(convertToVirtualLocation(gps.lat, gps.lng))
    }
    else{
      a = L.latLng(convertToVirtualLocation(FAKELOC.lat, FAKELOC.lng))
    }
    
    userMarker.setLatLng(a)
    
  } 
}, 1000); //

map.fitBounds(bounds);

map.on('click', function(e) {
    const realLat = e.latlng.lat / height * Math.abs(leftCornerLat - rightCornerLat) + leftCornerLat
    const realLng = e.latlng.lng / width * Math.abs(leftCornerLng - rightCornerLng) + leftCornerLng
    
    alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    alert("Real Location Lat,Lon : " + realLat + ",  " + realLng)
});

function setDestination(){

  let lat = -1;
  let lng = -1;
  
  let gps = localStorage.getItem('gpsLocation') ? JSON.parse(localStorage.getItem('gpsLocation')) : '?';
  if(gps !== '?'){
    let markerLoc = userMarker.getLatLng()
    
    if(disableFakeLoc){
      lat = gps.lat
      lng = gps.lng
    }
    else{
      lat = FAKELOC.lat
      lng = FAKELOC.lng
    }
  } 
  
  const destination = destinationsElem.value;
  
  for (const [key, value] of Object.entries(latLng)) {
    if (value.lat == lat && value.lng == lng) {
      if (key == destination) return "You already in destination location !!!";

      console.log(graph.Dijkstra("key", destination));
      return;
    }
  }

  let between = betweenTwo(lat, lng);

  // yeni node oluştur
  graph.addVertex("New"); // 31
  graph.addEdge(between[0], "New", distance(latLng[between[0]], { lat, lng }));
  graph.addEdge(between[1], "New", distance(latLng[between[1]], { lat, lng }));
  
  let shortestPath = graph.Dijkstra("New", destination)
  console.log(shortestPath)
  
  if(polyline)
    map.removeLayer(polyline)
  
  let polylineArray = []
  polylineArray.push(convertToVirtualLocation(lat,lng))
  for(let i=1; i<shortestPath.length; i++){
    let loc = latLng[shortestPath[i]]
    polylineArray.push(convertToVirtualLocation(loc.lat,loc.lng))
  }
  console.log(polylineArray)
  polyline = L.polyline(polylineArray).addTo(map)
  
}

function muratClicked(){
  disableFakeLoc = true 
}