// Store API query variables

// Create a map object
var myMap = L.map("map", {
    center: [34.05, -118.24],
    zoom: 10 
  });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 15,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
   accessToken: API_KEY
  }).addTo(myMap);
  
  
  var URL = "https://opendata.arcgis.com/datasets/6679d1ccc3744a7f87f7855e7ce33395_1.geojson";
  
  
  // Grab our GeoJSON data
  d3.json(URL, function(data) {
  
    var metroIcon= new L.Icon({
      iconUrl:'/static/png/bus.png',
      iconSize: [27, 27],
      iconAnchor: [13, 27],
      popupAnchor:  [1, -24]
      
    })
    // Create a GeoJSON layer with the retrieved data
    // L.geoJson((data), {icon:metroIcon}).addTo(myMap)
    L.geoJson((data), {pointToLayer: function(feature, latlag) {
      return L.marker (latlag, {icon: metroIcon}).addTo(myMap)}
  })});
  