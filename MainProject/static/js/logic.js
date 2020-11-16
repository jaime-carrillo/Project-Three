var baseURL = "https://emsmain.herokuapp.com";
var baseURL2 = "http://127.0.0.1:5000"

//Set up Service Planning Area boundries
var spa_link = "../data/spa.geojson"
    //var spa_link = "https://opendata.arcgis.com/datasets/e9134f735c0c473d8156f4703a687ce9_4.geojson"
    //set up color function for each area

function chooseColor(objectid) {
    switch (objectid) {
        case "1":
            return "#fee08b";
        case "2":
            return "#fc8d59";
        case "3":
            return "#d9ef8b";
        case "4":
            return "#d9ef8b";
        case "5":
            return "#d73027";
        case "6":
            return "#1a9850";
        case "7":
            return "#91cf60";
        case "8":
            return "#91cf60";
        default:
            return "grey";
    }
}

d3.json(spa_link, function(spa_data) {
    console.log(spa_data.features[0].properties.objectid)
    spa = L.geoJson(spa_data, {
            style: function(feature) {
                return {
                    color: chooseColor(feature.properties.objectid), //SPA_2012 SPA_NAME objectid
                    //fillColor: "blue", //chooseColor(feature.properties.area),
                    fillOpacity: .6,
                    weight: 3
                }
            },
            onEachFeature: function(feature, layer) {
                layer.on({
                    mouseover: function(event) {
                        layer = event.target
                        layer.setStyle({
                            fillOpacity: .2
                        });
                    },
                    mouseout: function(event) {
                            layer = event.target
                            layer.setStyle({
                                fillOpacity: .7
                            })
                        }
                        // ,
                        // click: function(event) {
                        //     myMap.fitBounds(event.target.getBounds())
                        // }
                });
                layer.bindPopup("<h1>" + feature.properties.SPA_NAME + "</h1>") //AREA_NAME spa_name
            }
        }) //.addTo(myMap)
});

// Store API query variables
var facURL = baseURL + "/api/v1.0/facilities";
// var hosURL = baseURL + "/api/v1.0/hospitals";
var hosURL = baseURL + "/api/v1.0/encounters";
var foodURL = baseURL + "/api/v1.0/food";

// // Assemble API query URL
// var url = baseURL + option
// console.log(url)

// Grab the data with d3
d3.json(facURL, function(response) {


    // Create feature group
    facilities = L.featureGroup(getArrayOfMarkers())

    //Create function to get an array of the lat and lon

    function getArrayOfMarkers() {
        var result = [];

        // Loop through data
        for (var i = 0; i < response.length; i++) {

            // Set the data location property to a variable
            var lat = response[i].LATITUDE;
            var lon = response[i].LONGITUDE;

            // Check for location property
            if (lat) {

                //Icon for hospital markers
                var chcIcon = new L.Icon({
                    iconSize: [27, 27],
                    iconAnchor: [13, 27],
                    popupAnchor: [1, -24],
                    iconUrl: '../png/clinic2.png'
                });

                result.push(L.marker([lat, lon], { icon: chcIcon }))
                    // popup.push(L.marker.bindPopup(response[i].Name));
                    // result.push([lat, lon])

            }

        }
        return result;
    }
});

// Grab the data with d3
d3.json(hosURL, function(response) {

    // var parentGroup = L.markerClusterGroup()

    // Create feature group
    hospitals = L.featureGroup(getArrayOfMarkers())

    // test = L.featureGroup.subGroup(
    //     parentGroup,
    //     getArrayOfMarkers()
    // )

    //Create function to get an array of the lat and lon

    function getArrayOfMarkers() {
        var result = [];
        // var popup = [];

        // Loop through data
        for (var i = 0; i < response.length; i++) {

            // Set the data location property to a variable
            var lat = response[i].LATITUDE;
            var lon = response[i].LONGITUDE;
            var newwidth = response[i].Target * 900;
            var newheight = response[i].Target * 900;
            // console.log(lat)

            // Check for location property
            if (lat) {

                //Icon for hospital markers
                var hosIcon = new L.Icon({
                    iconSize: [newwidth, newheight], // [27, 27]
                    iconAnchor: [13, 27],
                    popupAnchor: [1, -24],
                    iconUrl: '../png/hospital2.png'
                });

                result.push(L.marker([lat, lon], { icon: hosIcon }))
                    // popup.push(L.marker.bindPopup(response[i].Name));
                    // result.push([lat, lon])

            }

        }

        return result;
    }
});

// Grab the data with d3
d3.json(foodURL, function(response) {

    // var parentGroup = L.markerClusterGroup()

    // Create feature group
    food = L.featureGroup(getArrayOfMarkers())

    // test = L.featureGroup.subGroup(
    //     parentGroup,
    //     getArrayOfMarkers()
    // )

    //Create function to get an array of the lat and lon
    function getArrayOfMarkers() {
        var result = [];
        // var popup = [];

        // Loop through data
        for (var i = 0; i < response.length; i++) {

            // Set the data location property to a variable
            var lat = response[i].Latitude;
            var lon = response[i].Longitude;
            // console.log(lat)

            // Check for location property
            if (lat) {

                //Icon for hospital markers
                var foodIcon = new L.Icon({
                    iconSize: [27, 27],
                    iconAnchor: [13, 27],
                    popupAnchor: [1, -24],
                    iconUrl: '../png/carrot.png'
                });

                result.push(L.marker([lat, lon], { icon: foodIcon }))
                    // popup.push(L.marker.bindPopup(response[i].Name));
                    // result.push([lat, lon])

            }

        }

        return result;
    }
});
//Set up health distric boundries


// var link = "../data/hd.geojson"
var link = "https://opendata.arcgis.com/datasets/421da90ceff246d08436a17b05818f45_3.geojson"

d3.json(link, function(data) {
    console.log(data)
    health_districts = L.geoJson(data, {
            style: function(feature) {
                return {
                    color: "Grey", //chooseColor(feature.properties.SPA_2012),
                    //fillColor: "blue", //chooseColor(feature.properties.borough),
                    fillOpacity: .2,
                    weight: 2
                }
            },
            onEachFeature: function(feature, layer) {
                layer.on({
                    mouseover: function(event) {
                        layer = event.target
                        layer.setStyle({
                            fillOpacity: .8
                        });
                    },
                    mouseout: function(event) {
                            layer = event.target
                            layer.setStyle({
                                fillOpacity: .2
                            })
                        }
                        // ,
                        // click: function(event) {
                        //     myMap.fitBounds(event.target.getBounds())
                        // }
                });
                layer.bindPopup("<h1>" + feature.properties.HD_NAME + " (" + feature.properties.HD_2012 + ")" + "</h1>")
            }
        }) //.addTo(myMap)

    // Sending income, districts, and spa layer to the createMap function
    createMap(health_districts, spa, facilities, hospitals, food);
});

function createMap(health_districts, spa, facilities, hospitals, food) {

    // Create tile layer

    var darktmap = L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
            attribution: 'Stamen',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
        }) //.addTo(map);

    var watercolormap = L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
            attribution: 'Stamen',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
        }) //.addTo(map);

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    })

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Dark map": darktmap,
        "Color map": watercolormap,
        "Ligh map": lightmap

    };

    // Create an overlays object to add to the layer control
    var overlays = {
        "Health Districts": health_districts,
        "Service Planning Area": spa,
        "Community Health Clinics": facilities,
        "Hospitals": hospitals,
        "Food Pantries": food

    };

    // Create the map with our layers
    var myMap = L.map("map", {
        center: [34.26, -118.243683],
        zoom: 9.5,
        layers: [
            watercolormap,
            health_districts,
            spa,
            facilities,
            hospitals,
            food
        ]
    });


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlays, {
        collapsed: false
    }).addTo(myMap);

}