var baseURL = "https://emsmain.herokuapp.com";
var baseURL2 = "http://127.0.0.1:5000"

//Set up Service Planning Area boundries
var spa_link = "../data/spa.geojson"
    //var spa_link = "https://opendata.arcgis.com/datasets/e9134f735c0c473d8156f4703a687ce9_4.geojson"
    //set up color function for each area

function chooseColor(objectid) {
    switch (objectid) {
        case "1":
            return "#d73027";
        case "2":
            return "#d9ef8b";
        case "3":
            return "#fc8d59";
        case "4":
            return "#91cf60";
        case "5":
            return "#fc8d59";
        case "6":
            return "#d9ef8b";
        case "7":
            return "#1a9850";
        case "8":
            return "#1a9850";
        default:
            return "grey";
    }
}

function setColor(density) {
    return density > 85 ? '#a50f15' :
        density > 15 ? '#de2d26' :
        density > 8 ? '#fb6a4a' :
        density > 4 ? '#fcae91' :
        '#fee5d9';
};



function getTarget(objectid) {
    switch (objectid) {
        case "1":
            return "41.9%"; //#d73027  Worst 5
        case "2":
            return "34.0%"; //d9ef8b 3
        case "3":
            return "38.3%"; //fc8d59 4
        case "4":
            return "32.8%"; //#91cf60 2
        case "5":
            return "36.1%"; //fc8d59 4
        case "6":
            return "33.4%"; //d9ef8b 3
        case "7":
            return "31.6%"; //#1a9850 Best 1
        case "8":
            return "31.5%"; //#1a9850 Best 1

            //#1a9850 Best 1
            //#91cf60 2
            //d9ef8b 3
            //fc8d59 4
            //#d73027  Worst 5

        default:
            return "grey";
    }
}

d3.json(spa_link, function(spa_data) {
    // console.log(spa_data.features[0].properties.objectid)
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
                layer.bindPopup("<h1>" + feature.properties.spa_name + "</h1> \n" + "<h3> Average Non-Urgent visits for hospitals </h3><h2>" + getTarget(feature.properties.objectid) + "</h2>") //AREA_NAME spa_name
            }
        }) //.addTo(myMap)
});

// Store API query variables
var facURL = baseURL + "/api/v1.0/facilities";

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
            var newwidthfac = response[i].Target * 125;
            var newheightfac = response[i].Target * 125;

            function chooseImage(clinic) {
                switch (clinic) {
                    case "Free Clinic":
                        return '../png/clinic.png';
                    default:
                        return '../png/clinic3.png';
                };
            }

            // Check for location property
            if (lat) {

                //Icon for hospital markers
                var chcIcon = new L.Icon({
                    iconSize: [newwidthfac, newheightfac], //[newwidthfac, newheightfac],
                    iconAnchor: [13, 27],
                    popupAnchor: [1, -24],
                    iconUrl: chooseImage(response[i].Type)
                });
                result.push(L.marker([lat, lon], { icon: chcIcon }))
                    // popup.push(L.marker.bindPopup(response[i].Name));
                    // result.push([lat, lon])

            }

        }
        return result;
    }
});

// var hosURL = baseURL + "/api/v1.0/hospitals";
var hosURL = baseURL + "/api/v1.0/encounters";

// Grab the data with d3
d3.json(hosURL, function(response) {

    // var parentGroup = L.markerClusterGroup()

    // Create feature group
    hospitals = L.featureGroup(getArrayOfMarkers())

    //Create function to get an array of the lat and lon
    function getArrayOfMarkers() {
        var result = [];

        // Loop through data
        for (var i = 0; i < response.length; i++) {

            // Set the data location property to a variable
            var lat = response[i].LATITUDE;
            var lon = response[i].LONGITUDE;
            var newwidth = response[i].Target_1 * 125;
            var newheight = response[i].Target_1 * 125;
            console.log(response[0].Target);

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

})



// var link = "../data/hd.geojson"
var link = "https://opendata.arcgis.com/datasets/421da90ceff246d08436a17b05818f45_3.geojson"

d3.json(link, function(data) {
    // console.log(data)
    health_districts = L.geoJson(data, {
            style: function(feature) {
                return {
                    color: "Grey", //chooseColor(feature.properties.SPA_2012),
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

    // Sending facilities, hospitals, districts, and spa layer to the createMap function
    createMap(health_districts, spa, facilities, hospitals);
});

function createMap(health_districts, spa, facilities, hospitals) {

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
        "Hospitals": hospitals

    };

    // Create the map with our layers
    var myMap = L.map("map", {
        center: [34.26, -118.243683],
        zoom: 9.5,
        layers: [
            watercolormap,
            health_districts,
            spa,
            hospitals
        ]
    });


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlays, {
        collapsed: true
    }).addTo(myMap);

    // Add Scale Bar to Map
    L.control.scale({ position: 'topleft' }).addTo(myMap);

}