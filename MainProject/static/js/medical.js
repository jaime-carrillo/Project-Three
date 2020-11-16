// var geoData = "https://opendata.arcgis.com/datasets/865f2509d5d4450ea6bfd527596ef502_0.geojson"
var geoData = "https://cdph-chhsagency.opendata.arcgis.com/datasets/4b4b57162810402096d1887e780b9100_0.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D"

d3.json(geoData, function(incomingData) {
    console.log(incomingData)

    // Create a new choropleth layer
    var allfacilities = L.choropleth(incomingData, {

            //     function filterMovieRatings(movie) {
            //         return movie.feature.properties.FAC_TYPE_CODE = "GACH";
            //     }
            // var filteredMovies = incomingData.filter(filterMovieRatings);

            // Define what  property in the features to use
            valueProperty: "CAPACITY",

            // Set color scale
            scale: ["#00c7ff", "#94003a"],

            // Number of breaks in step range
            steps: 6,

            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            style: {
                // Border color
                color: "#fff",
                weight: 1,
                fillOpacity: 0.9
            },

            // Binding a pop-up to each layer
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Fac Name:<br>" +
                    feature.properties.FACNAME);
            }
        }) //.addTo(myMap);

    // Add our marker cluster layer to the map
    // myMap.addLayer(markers);

    //Set up Service Planning Area boundries
    var spa_link = "../data/spa.geojson"
        // "https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/Administrative_Boundaries/MapServer/3/query?where=1%3D1&outFields=*&outSR=4326&f=json"

    //set up color function for each area
    function chooseColor(objectid) {
        switch (objectid) {
            case "1":
                return "orange";
            case "2":
                return "yellow";
            case "3":
                return "green";
            case "4":
                return "purple";
            case "5":
                return "green";
            case "6":
                return "yellow";
            case "7":
                return "orange";
            case "8":
                return "purple";
            default:
                return "grey";
        }
    }


    d3.json(spa_link, function(spa_data) {
        console.log(spa_data)
        spa = L.geoJson(spa_data, {
                style: function(feature) {
                    return {
                        color: chooseColor(feature.properties.objectid),
                        //fillColor: "blue", //chooseColor(feature.properties.area),
                        fillOpacity: .9,
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
                    layer.bindPopup("<h1>" + feature.properties.spa_name + " (" + feature.properties.abbv + ")" + "</h1>")
                }
            }) //.addTo(myMap)
    });

    //Set up health distric boundries
    var link = "../data/hd.geojson"

    d3.json(link, function(data) {
        console.log(data)
        health_districts = L.geoJson(data, {
                style: function(feature) {
                    return {
                        color: "black",
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
                    });
                    layer.bindPopup("<h1>" + feature.properties.hd_name + " (" + feature.properties.hd_2012 + ")" + "</h1>")
                }
            }) //.addTo(myMap)

        // Sending income, districts, and spa layer to the createMap function
        createMap(allfacilities, health_districts, spa);
    });

});


function createMap(allfacilities, health_districts, spa) {

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
        "All facilities": allfacilities,
        "Health Districts": health_districts,
        "Service Planning Area": spa
    };

    // Create the map with our layers
    var myMap = L.map("map", {
        center: [34.26, -118.243683],
        zoom: 9.5,
        layers: [
            watercolormap,
            allfacilities,
            health_districts,
            spa
        ]
    });


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlays, {
        collapsed: false
    }).addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = allfacilities.options.limits;
        var colors = allfacilities.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Capcity</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
}