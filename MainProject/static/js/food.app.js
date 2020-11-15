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

// Store API query variables
var URL = "https://emsmain.herokuapp.com/api/v1.0/food";


// Grab the data with d3
d3.json(URL, function(response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {

        // Set the data location property to a variable
        var lat = response[i].Latitude;
        var lon = response[i].Longitude;

        // Check for location property
        if (lat) {

            //Icon
            var foodIcon = new L.Icon({
                iconSize: [27, 27],
                iconAnchor: [13, 27],
                popupAnchor: [1, -24],
                iconUrl: 'static/png/carrot.png'
            });

            // Add a new marker to the cluster group and bind a pop-up
            markers.addLayer(L.marker([lat, lon], { icon: foodIcon })).bindPopup(response[i].name);

            myMap.addLayer(markers);


        }

    }

});