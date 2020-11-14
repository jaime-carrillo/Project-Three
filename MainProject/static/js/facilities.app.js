// Creating map object
var myMap = L.map("map", {
  center: [34.05, -118.24],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "http://127.0.0.1:5000/api/v1.0/facilities";

// Assemble API query URL
var url = baseURL

// Grab the data with d3
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var lat = response[i].LATITUDE;
    var lon = response[i].LONGITUDE;
    console.log(lat)

    // Check for location property
    if (lat) {

      //Icon for hospital markers
      var chcIcon = new L.Icon({
        iconSize: [27, 27],
        iconAnchor: [13, 27],
        popupAnchor:  [1, -24],
        iconUrl: 'static/png/clinic.png'
    });

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat,lon],{icon:chcIcon})
        .bindPopup(response[i].Name));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});



